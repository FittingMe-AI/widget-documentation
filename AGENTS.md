# FittingMe public documentation

## Purpose

This repository publishes the retailer-facing FittingMe integration documentation with Mintlify. Content pages are MDX files, and `docs.json` owns navigation and site presentation.

The documented product surface is the merchant embed: Journey Embed placement, the public loader contract, and error responses a retailer integration can observe.

## Repository boundary

- This repository has one branch, `main`; it does not use the b2b `dev → staging → main` promotion train.
- A documentation change stays in this repository. The sibling `b2b` repository may be read as the implementation source but must not be edited as part of the same change.
- Do not document internal administration surfaces, QA tooling, or the Retailer Portal here.
- Never include secrets, live credentials, or production retailer keys in prose or examples. Browser examples may use explicit placeholders for the public retailer key.

## Canonical vocabulary

Product vocabulary lives in `CONTEXT.md` at the workspace root. Never resolve it with a relative `../` path from a worktree.

Run `git worktree list` in this repository. The first worktree is the main checkout; its parent directory is the workspace root containing `CONTEXT.md`.

## Sources of truth

Read the relevant source before changing an API or integration claim:

| Claim | Canonical source |
| --- | --- |
| Mounted backend routes and middleware | `backend/src/routes/mod.rs` |
| Retailer API-key authentication | `backend/src/middleware/auth.rs` |
| Loader URL, attributes, defaults, and browser API | Sibling `widget/loader/fittingme-loader.js`, `widget/loader/lib/embed-protocol.js` and `widget/infra/image/default.conf.template` (ADR-078); the b2b loader was removed. |
| RFC 9457 business-error mapping | `backend/src/error.rs` |
| Shared Problem Document shape | `crates/problem-details/src/lib.rs` |
| Framework errors and query-free `instance` | `backend/src/middleware/problem_normalization.rs` |
| Complete problem type catalogue | `backend/docs/refactor/api-2026-07/api-reference.yaml` |

Loader provenance (W1-07, 2026-09-13 Europe/Paris): measured widget commit
`28c908bfc3152e317dadcfa53eedc3893168be96`. From that widget checkout,
`git show HEAD:loader/lib/embed-protocol.js` gives the closed configuration fields;
`git show HEAD:loader/fittingme-loader.js` gives required-field validation and the
instance API; `git show HEAD:infra/image/default.conf.template` gives the asset route.

The July 2026 catalogue is historical for most API content, but its Problem Document schema and type inventory are current and guarded by b2b tests. Do not use its unrelated paths or operations without checking the mounted router.

## Provenance discipline

1. Verify every new or changed assertion about the API against the owning repository implementation or an executable contract before writing it.
2. Cite each supporting source location as `file:line` in the documentation commit body.
3. Treat a documented route absent from `backend/src/routes/mod.rs` as drift. Remove it or escalate the product decision; never invent a replacement.
4. Verify authentication middleware at the mounted route. The retailer embed uses `X-API-Key`; do not describe a Bearer scheme unless a real mounted route uses it.
5. When a cross-repository inventory cannot be guarded in CI, add a dated provenance note with the owning repository commit and the exact measurement command.

## Problem Document contract

- Backend error bodies follow RFC 9457 and use `application/problem+json`.
- `type` uses the stable `https://fittingme.ai/problems/<slug>` base.
- Root extension `code` is derived from the final `type` segment; it is not maintained independently.
- Root extensions `field` and `capability` appear only when applicable.
- `instance` is the request path without its query string.
- Decision D-F8: problem `type` URIs are stable identifiers, not links. No environment dereferences them. Point readers to `api-reference/errors.mdx`, never tell them to open a type URI.

## Brand and presentation

Presentation follows the FittingMe design system, whose canonical source is `public-site/site/public/design-system/fm-tokens.css` in the sibling `public-site` repository. The palette is four colours — `#ffffff`, `#eaeae4`, `#b4ad91`, `#000000` — plus tints derived from them; headings are Playfair Display, body text is Outfit, and containers are square-cornered.

- `docs.json` carries what Mintlify exposes: accent colours, fonts, logo, favicon, code-block theme, default appearance.
- `style.css` carries only what `docs.json` cannot express: square corners, heading weight and tracking, link hairlines, callouts brought back inside the palette, selection and focus ring. Every rule names the design-system rule it ports.
- `logo/light.svg`, `logo/dark.svg`, and `favicon.svg` are byte-identical copies of public-site assets. Re-copy them instead of editing them here, and prove the copy with `shasum -a 256`.
- Never introduce a colour outside the palette, including a Mintlify default that arrives with a component. Mintlify paints `Note` blue and `Warning` yellow through utility classes on both the surface and the text; overriding the surface alone leaves coloured text behind.

## Content and navigation

- Keep retailer integration pages in English unless the site adopts an explicit localization structure.
- Use active voice, second person, sentence-case headings, and concise paragraphs.
- Keep examples copyable and use placeholders such as `YOUR_PUBLISHABLE_KEY`.
- Add, move, or delete a page and its `docs.json` navigation entry together.
- Changing the external publication domain of this Mintlify site is a separate deployment decision. Do not infer that change from API, CDN, marketing, or portal domain migrations.

## Validation

This repository has no automated test suite. For every change:

1. Parse `docs.json` as JSON.
2. Confirm every navigation page exists and every root-relative MDX link resolves.
3. Search for retired routes, authentication schemes, hosts, and deleted page references.
4. If a local Mintlify CLI is installed, run its development server and inspect MDX components, tables, code blocks, and links. If it is unavailable, report that the site was not previewed rather than claiming a render check.
5. Inspect `git diff --check` and the path-scoped staged diff before committing.

Use conventional commit messages. Stage explicit paths only; never use `git add -A`, `git stash`, `--no-verify`, or push without first reporting what changed and what remains.
