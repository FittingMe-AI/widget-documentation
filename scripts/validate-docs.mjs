import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(resolve(root, 'docs.json'), 'utf8'));
const languages = config.navigation.languages;
const pagesByLanguage = new Map((languages ?? []).map(language => [
  language.language,
  language.tabs.flatMap(tab => tab.groups.flatMap(group => group.pages)),
]));
const pages = [...pagesByLanguage.values()].flat();
const errors = [];
let links = 0, examples = 0, blocks = 0, anchors = 0;
if (!pagesByLanguage.has('en') || !pagesByLanguage.has('fr')) errors.push('Expected English and French navigation.');
if (pagesByLanguage.get('en')?.length !== 22 || pagesByLanguage.get('fr')?.length !== 22) {
  errors.push(`Expected 22 pages in each language, found en=${pagesByLanguage.get('en')?.length ?? 0}, fr=${pagesByLanguage.get('fr')?.length ?? 0}.`);
}
if (!languages?.find(language => language.language === 'en')?.default) errors.push('English must remain the default language.');
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
if (pages.length !== 44 || new Set(pages).size !== 44) errors.push(`Expected 44 distinct localized pages, found ${pages.length}.`);
const codeBlocksByPage = new Map();
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
  codeBlocksByPage.set(page, [...source.matchAll(/^```([^\n]*)\n([\s\S]*?)\n```/gm)].map(([, language, code]) => `${language}\n${code}`));
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
if (examples < 6) errors.push(`Expected at least 3 complete HTML examples in each language, found ${examples}.`);
console.log(JSON.stringify({ pages: pages.length, pagesByLanguage: Object.fromEntries([...pagesByLanguage].map(([language, entries]) => [language, entries.length])), publicFiles: inventory.length, links, anchors, codeBlocks: blocks, completeHtmlExamples: examples, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
