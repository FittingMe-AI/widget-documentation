import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(resolve(root, 'docs.json'), 'utf8'));
const languages = config.navigation.languages;
const groupsByLanguage = new Map((languages ?? []).map(language => [
  language.language,
  language.tabs.flatMap(tab => tab.groups),
]));
const pagesByLanguage = new Map([...groupsByLanguage].map(([language, groups]) => [language, groups.flatMap(group => group.pages)]));
const pages = [...pagesByLanguage.values()].flat();
const errors = [];
let links = 0, examples = 0, blocks = 0, anchors = 0;
if (!pagesByLanguage.has('en') || !pagesByLanguage.has('fr')) errors.push('Expected English and French navigation.');
if (!languages?.find(language => language.language === 'en')?.default) errors.push('English must remain the default language.');
// The founder-approved pages are the `### Group` / `- \`route\`` list under `## Navigation` in the
// design record. English navigation must equal it in order and groups, and French must mirror it
// under `fr/`: approving a page is one edit to that list, and a page missing from it is an error.
const designRecord = 'drafts/documentation-design.md';
const approved = [];
let approvedGroup;
for (const line of (await readFile(resolve(root, designRecord), 'utf8')).split(/^## /m).find(section => section.startsWith('Navigation\n'))?.split('\n') ?? []) {
  approvedGroup = line.match(/^### (.+)$/)?.[1].trim() ?? approvedGroup;
  const route = line.match(/^- `([^`]+)`/)?.[1];
  if (route) approved.push({ group: approvedGroup, page: route });
}
const approvedGroupNames = [...new Set(approved.map(entry => entry.group))];
function compareWithApproved(language, found, expected) {
  const [foundPages, expectedPages] = [found, expected].map(entries => entries.map(entry => entry.page));
  const unapproved = foundPages.filter(page => !expectedPages.includes(page));
  const missing = expectedPages.filter(page => !foundPages.includes(page));
  for (const page of unapproved) errors.push(`docs.json (${language}) lists ${page}, which is not on the approved list in ${designRecord}; a new page needs founder approval there first.`);
  for (const page of missing) errors.push(`docs.json (${language}) is missing the approved page ${page}.`);
  if (unapproved.length || missing.length) return;
  const describe = entry => (entry ? `${entry.page} in group ${entry.group}` : 'absent');
  for (let index = 0; index < Math.max(found.length, expected.length); index++) {
    if (found[index]?.page === expected[index]?.page && found[index]?.group === expected[index]?.group) continue;
    errors.push(`docs.json (${language}) navigation entry ${index + 1} is ${describe(found[index])}; the approved list expects ${describe(expected[index])}.`);
    return;
  }
}
compareWithApproved('en', (groupsByLanguage.get('en') ?? []).flatMap(group => group.pages.map(page => ({ group: group.group, page }))), approved);
// French group labels are translated, so French groups are compared by position.
compareWithApproved('fr',
  (groupsByLanguage.get('fr') ?? []).flatMap((group, index) => group.pages.map(page => ({ group: index + 1, page }))),
  approved.map(entry => ({ group: approvedGroupNames.indexOf(entry.group) + 1, page: `fr/${entry.page}` })));
async function publicMdx(directory = root) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['drafts', 'node_modules'].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) found.push(...await publicMdx(path));
    else if (entry.name.endsWith('.mdx')) found.push(path.slice(root.length + 1, -4));
  }
  return found;
}
const inventory = await publicMdx();
for (const page of inventory) if (!pages.includes(page)) errors.push(`Unlisted public page: ${page}`);
if (new Set(pages).size !== pages.length) errors.push(`docs.json lists ${pages.length} pages, ${new Set(pages).size} of them distinct.`);
const codeBlocksByPage = new Map();
const proseIdentifiersByPage = new Map();
const codeFences = /^```([^\n]*)\n([\s\S]*?)\n```/gm;
for (const page of pages) {
  let source;
  try { source = await readFile(resolve(root, `${page}.mdx`), 'utf8'); }
  catch { errors.push(`Missing page: ${page}`); continue; }
  if (!/^---\n[\s\S]*?title: .+\n[\s\S]*?description: .+\n---/.test(source)) errors.push(`${page}: missing metadata`);
  for (const match of source.matchAll(/(?:\]\(|href=["'])(\/[\w/.-]+)(?:#([^\s"')]+))?["')]/g)) {
    links++;
    const path = match[1].slice(1);
    try {
      const target = resolve(root, path.includes('.') ? path : `${path}.mdx`);
      await access(target);
      if (match[2]) {
        anchors++;
        const targetSource = await readFile(target, 'utf8');
        const ids = [...targetSource.matchAll(/^#{1,6} (.+)$/gm)].flatMap(([, text]) => {
          const heading = text.trim().toLowerCase();
          const mintlifyId = heading.replace(/\s+/g, '-');
          const plainId = heading.replace(/[^\p{L}\p{N} _-]/gu, '').replace(/ /g, '-');
          return [mintlifyId, plainId];
        });
        if (!ids.includes(match[2])) errors.push(`${page}: missing anchor ${match[1]}#${match[2]}`);
      }
    }
    catch { errors.push(`${page}: broken link ${match[1]}`); }
  }
  const fences = [...source.matchAll(/^```/gm)].length;
  if (fences % 2) errors.push(`${page}: unclosed code fence`);
  blocks += fences / 2;
  codeBlocksByPage.set(page, [...source.matchAll(codeFences)].map(([, language, code]) => `${language}\n${code}`));
  const identifiers = new Map();
  for (const [, code] of source.replace(codeFences, '').matchAll(/`([^`\n]+)`/g)) identifiers.set(code, (identifiers.get(code) ?? 0) + 1);
  proseIdentifiersByPage.set(page, identifiers);
  for (const [, html] of source.matchAll(/```html[^\n]*\n([\s\S]*?)\n```/g)) {
    if (!html.startsWith('<!doctype html>')) continue;
    examples++;
    if (!html.includes('</html>')) errors.push(`${page}: incomplete HTML document`);
    for (const [, script] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
      try { new vm.Script(script); } catch (error) { errors.push(`${page}: ${error.message}`); }
    }
  }
  const retired = /data-api-url|data-api-key|cdn\.fittingme\.ai|fittingme:ready|fittingme:triggerState|Bearer YOUR|reset page|coming soon|TODO|TBD/gi;
  for (const match of source.matchAll(retired)) errors.push(`${page}: retired or unfinished text: ${match[0]}`);
}
for (const page of pagesByLanguage.get('en') ?? []) {
  const frenchPage = `fr/${page}`;
  const englishBlocks = codeBlocksByPage.get(page);
  const frenchBlocks = codeBlocksByPage.get(frenchPage);
  if (!frenchBlocks) errors.push(`${frenchPage}: missing French code blocks.`);
  else if (JSON.stringify(englishBlocks) !== JSON.stringify(frenchBlocks)) errors.push(`${frenchPage}: code blocks differ from the English source.`);
}
// Every inline identifier of the English events reference (event types, fields, columns,
// values) must be named the same number of times on each page in both languages.
const eventsPageIdentifiers = [...(proseIdentifiersByPage.get('reference/events')?.keys() ?? [])];
let vocabularyChecks = 0;
for (const page of pagesByLanguage.get('en') ?? []) {
  const [english, french] = [page, `fr/${page}`].map(path => proseIdentifiersByPage.get(path));
  if (!english || !french) continue; // a missing page is already reported above
  for (const identifier of eventsPageIdentifiers) {
    vocabularyChecks++;
    const [inEnglish, inFrench] = [english, french].map(counts => counts.get(identifier) ?? 0);
    if (inEnglish !== inFrench) errors.push(`fr/${page}: \`${identifier}\` is named ${inEnglish} time(s) in English, ${inFrench} in French.`);
  }
}
if (examples < 6) errors.push(`Expected at least 3 complete HTML examples in each language, found ${examples}.`);
console.log(JSON.stringify({ approvedPages: approved.length, pages: pages.length, pagesByLanguage: Object.fromEntries([...pagesByLanguage].map(([language, entries]) => [language, entries.length])), publicFiles: inventory.length, links, anchors, codeBlocks: blocks, completeHtmlExamples: examples, eventsPageIdentifiers: eventsPageIdentifiers.length, vocabularyChecks, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
