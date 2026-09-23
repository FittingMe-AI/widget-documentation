import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(resolve(root, 'docs.json'), 'utf8'));
const pages = config.navigation.tabs.flatMap(t => t.groups.flatMap(g => g.pages));
const errors = [];
let links = 0, examples = 0, blocks = 0, anchors = 0;
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
if (pages.length !== 22 || new Set(pages).size !== 22) errors.push(`Expected 22 distinct pages, found ${pages.length}.`);
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
        const ids = [...targetSource.matchAll(/^#{1,6} (.+)$/gm)].map(([, text]) => text.toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, '').replace(/ /g, '-'));
        if (!ids.includes(match[2])) errors.push(`${page}: missing anchor ${match[1]}#${match[2]}`);
      }
    }
    catch { errors.push(`${page}: broken link ${match[1]}`); }
  }
  const fences = [...source.matchAll(/^```/gm)].length;
  if (fences % 2) errors.push(`${page}: unclosed code fence`);
  blocks += fences / 2;
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
if (examples < 3) errors.push(`Expected at least 3 complete HTML examples, found ${examples}.`);
console.log(JSON.stringify({ pages: pages.length, publicFiles: inventory.length, links, anchors, codeBlocks: blocks, completeHtmlExamples: examples, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
