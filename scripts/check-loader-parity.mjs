// Every public loader input must be documented: each data-* attribute of the
// loader's configuration vocabulary in reference/configuration, and each
// method of window.FittingMe in reference/javascript, in English and French.
//
// Reads the widget repository through git, at a ref (default origin/main, the
// published loader), so a local edit in the widget checkout changes nothing.
// Run `git -C <widget> fetch origin main` first.
//
//   node scripts/check-loader-parity.mjs [--widget <path>] [--ref <ref>]
//
// Local only: CI cannot read the private widget repository.
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const option = name => {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
};

// Inputs documented elsewhere on purpose, each with its reason.
const EXEMPT = new Map([
  ['data-sizing-domain', 'Sizing is outside this site; reference/configuration names it as unnecessary for try-on.'],
  ['sizing', 'Sizing handle alias; Sizing is outside this site.'],
  ['tryon', 'Legacy handle alias, covered by "Older call forms" as handle methods.'],
]);

function workspaceRoot() {
  // The first worktree is the main checkout; its parent is the workspace root.
  const list = execFileSync('git', ['-C', root, 'worktree', 'list', '--porcelain'], { encoding: 'utf8' });
  return dirname(list.split('\n')[0].replace(/^worktree /, ''));
}

const widget = option('--widget') ?? resolve(workspaceRoot(), 'widget');
const ref = option('--ref') ?? 'origin/main';
const git = (...command) => execFileSync('git', ['-C', widget, ...command], { encoding: 'utf8' });
const sha = git('rev-parse', '--short', ref).trim();
const protocol = git('show', `${ref}:loader/lib/embed-protocol.js`);
const loader = git('show', `${ref}:loader/fittingme-loader.js`);

const configBlock = protocol.match(/export const CONFIG_FIELDS = Object\.freeze\(\[([\s\S]*?)\]\);/);
const registryBlock = loader.match(/\n    var registry = \{\n([\s\S]*?)\n    \};\n/);
const errors = [];
if (!configBlock) errors.push('CONFIG_FIELDS not found in loader/lib/embed-protocol.js');
if (!registryBlock) errors.push('var registry = { … } not found in loader/fittingme-loader.js');

const attributes = configBlock ? [...configBlock[1].matchAll(/attr: '(data-[a-z-]+)'/g)].map(([, name]) => name) : [];
const methods = registryBlock
  ? [...registryBlock[1].matchAll(/^ {6}(?:get )?([a-zA-Z]\w*)(?:: function|\(\))/gm)].map(([, name]) => name)
  : [];
if (configBlock && attributes.length === 0) errors.push('CONFIG_FIELDS parsed to zero attributes');
if (registryBlock && methods.length === 0) errors.push('registry parsed to zero methods');

const named = (source, name) => new RegExp('`(?:window\\.FittingMe\\.)?' + name.replace(/[.-]/g, '\\$&') + '(?:\\(|`)').test(source);
const checks = [
  ['reference/configuration', attributes],
  ['reference/javascript', methods],
];
let compared = 0;
for (const [page, names] of checks) {
  for (const path of [page, `fr/${page}`]) {
    const source = await readFile(resolve(root, `${path}.mdx`), 'utf8');
    for (const name of names) {
      if (EXEMPT.has(name)) continue;
      compared++;
      if (!named(source, name)) errors.push(`${path}: \`${name}\` is a public loader input (widget ${ref} ${sha}) but is not named.`);
    }
  }
}
for (const name of EXEMPT.keys()) {
  if (!attributes.includes(name) && !methods.includes(name)) errors.push(`Exemption \`${name}\` no longer matches a loader input; remove it.`);
}

console.log(JSON.stringify({ widget: `${ref} ${sha}`, attributes: attributes.length, methods: methods.length, exempt: EXEMPT.size, compared, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
