# FittingMe public documentation

## Purpose

This repository publishes the retailer-facing FittingMe integration documentation with Mintlify. Content pages are MDX files, and `docs.json` owns navigation and site presentation.

The current documentation scope is virtual try-on only: onboarding, Journey Embed placement, the public loader contract, direct `fittingme/3` integration, configuration, tracking and observable integration failures. Sizing is deferred while it is still being developed.

The founder-approved scope, developer goals and 22-page structure (approved 2026-09-23) are recorded in `drafts/documentation-design.md`. Catalogue onboarding is FittingMe-assisted and catalogue integration uses the loader; direct protocol examples use `fittingme/3` with a supplied garment image URL.

## Repository boundary

- This repository has one branch, `main`; it does not use the b2b `dev → staging → main` promotion train.
- A documentation change stays in this repository. Sibling `widget`, `b2b` and `retailer-portal` repositories may be read as implementation sources but must not be edited as part of the same change.
- Portal coverage is limited to integration onboarding: initial access, keys and authorized domains. Do not document internal administration surfaces, QA tooling or catalogue API administration here.
- Never include secrets, live credentials, or production retailer keys in prose or examples. Browser examples may use explicit placeholders for the public retailer key.

## Retailer documentation update policy

Founder instruction (2026-09-18): assess documentation impact as part of changes
to the implementation or other sources used by these pages. Update the docs when
a developer following them would need different prerequisites, inputs, code,
actions, expected results or diagnostic guidance. Additions, removals, deprecations,
default changes and bug fixes can all trigger an update; the change's label or
size is not the criterion.

### Triggers and owners

| Change affecting existing documentation | Owning source to check |
| --- | --- |
| Loader configuration/API, direct protocol, public events, lifecycle, browser support or Try-On steps | `widget` |
| Authentication/domains, entitlement, product/image/session rules, observable errors or service behavior | `b2b/backend`; shared crates, capture, VTON and hosting through `b2b/AGENTS.md` |
| Initial access, roles/authenticator setup, keys, domain configuration, installation snippets or onboarding steps | `retailer-portal` |
| Shared brand assets/tokens or referenced contact/support links and snippets | `public-site` |
| React/Next.js or GTM/GA4 changes that invalidate a recipe; Mintlify changes that break rendering/navigation | The relevant official documentation and the affected local example/render |
| Reproducible reader difficulty, failed/stale examples, broken links/anchors, missing conditions or misleading instructions | The affected page and its provenance sources |

Changes in other repositories trigger an update only through an actual effect on
this documented surface. Sizing, internal administration, model training and
billing internals do not enter the public guide merely because their code changes.
Keep the approved Try-On scope and 22-page navigation unless a scope change is
explicitly approved. Pure refactors, test/CI changes, or fixes restoring already
documented behavior need no public prose edit if the existing content remains true.

### Required follow-through

1. Identify affected pages from `docs.json` and the responsibilities in
   `drafts/documentation-design.md`. Check the authoritative reference, every
   dependent quickstart/recipe, and relevant troubleshooting/go-live checks.
   Record either `Documentation updated: <pages and evidence>` or
   `No public documentation impact: <concrete reason>` in the task/PR.
2. Verify changed claims against the owning source and executable contract;
   update `drafts/documentation-provenance.md` with the selected revision and
   supporting locations/measurements. Do not treat merged source as deployed
   availability. Keep unreleased behavior explicitly qualified in the local
   review and coordinate publication with the applicable service version.
3. Prepare the companion documentation change in this repository, separately
   from the implementation commit/PR. Source owners refer to this workspace's
   documentation checkout; from a worktree, locate the main checkout through
   `git worktree list` rather than assuming a sibling relative path. If access
   or explicit task scope prevents the companion edit, report the exact affected
   pages, required correction, source revision and outstanding verification in
   the authorized local handoff; do not claim documentation complete or silently
   defer it. This rule does not authorize external tracker writes or publication.
4. Preserve exact identifiers, conditions, event semantics and lifecycle order.
   Keep runnable examples complete, use numbered steps for procedures, and attach
   qualifications/expected results to their actions. Update affected anchor links
   when headings change; keep reference definitions authoritative.
5. Use Node 24 to run `node scripts/validate-docs.mjs`, run `git diff --check`,
   and inspect changed pages at desktop and mobile widths. For changed executable
   examples or behavior, exercise the affected journey against functioning
   services and record actual dependencies/limitations in `drafts/local-review.md`.
   Unchanged examples may retain their existing evidence when source and effective
   dependencies are unchanged; wording-only edits need no product rebuild.
6. Deliver the functioning local documentation for founder review. Publish only
   after explicit approval for those reviewed changes. A product deployment,
   green CI or earlier documentation approval is not approval to publish new docs.

## Canonical vocabulary

Product vocabulary lives in `CONTEXT.md` at the workspace root. Never resolve it with a relative `../` path from a worktree.

Run `git worktree list` in this repository. The first worktree is the main checkout; its parent directory is the workspace root containing `CONTEXT.md`.

## Sources of truth

Read the relevant source before changing an API or integration claim:

| Claim | Canonical source (relative to the named repository) |
| --- | --- |
| Mounted backend routes and middleware | `backend/src/routes/mod.rs` |
| Retailer API-key authentication | `backend/src/middleware/auth.rs` |
| Loader URL, attributes, defaults, and browser API | widget: `loader/fittingme-loader.js` and `loader/lib/embed-protocol.js` |
| Direct loader/widget protocol | widget: `docs/contracts/loader-widget-protocol-v2.md` (including the major-3 amendment), `foundation/fil.ts`, and `tests/contract/fixtures/protocole/` |
| Portal onboarding | retailer-portal: `docs/openapi.yaml` and `spa/src/` |
| RFC 9457 business-error mapping | `backend/src/error.rs` |
| Shared Problem Document shape | `crates/problem-details/src/lib.rs` |
| Framework errors and query-free `instance` | `backend/src/middleware/problem_normalization.rs` |
| Complete problem type catalogue | `backend/docs/refactor/api-2026-07/api-reference.yaml` |

The July 2026 catalogue is historical for most API content, but its Problem Document schema and type inventory are current and guarded by b2b tests. Do not use its unrelated paths or operations without checking the mounted router.

Rows without a repository prefix refer to b2b. Verify selected source revisions
and actual service availability before documenting operational onboarding steps.

## Provenance discipline

1. Verify every new or changed assertion about an integration or API against its owning implementation or an executable contract before writing it.
2. Cite each supporting location as `repository/file:line` in the documentation commit body.
3. Treat a documented route absent from `backend/src/routes/mod.rs` as drift. Remove it or escalate the product decision; never invent a replacement.
4. Verify authentication middleware at the mounted route. The retailer embed uses `X-API-Key`; do not describe a Bearer scheme unless a real mounted route uses it.
5. When a cross-repository inventory cannot be guarded in CI, add a dated provenance note with the owning repository's commit and the exact measurement command.

## Problem Document contract

- Backend error bodies follow RFC 9457 and use `application/problem+json`.
- `type` uses the stable `https://fittingme.ai/problems/<slug>` base.
- Root extension `code` is derived from the final `type` segment; it is not maintained independently.
- Root extensions `field` and `capability` appear only when applicable.
- `instance` is the request path without its query string.
- Decision D-F8: problem `type` URIs are stable identifiers, not links. No environment dereferences them. Explain applicable errors in the integration troubleshooting material; never tell readers to open a type URI.

## Brand and presentation

Presentation follows the FittingMe design system, whose canonical source is `public-site/site/public/design-system/fm-tokens.css` in the sibling `public-site` repository. The palette is four colours — `#ffffff`, `#eaeae4`, `#b4ad91`, `#000000` — plus tints derived from them, and containers are square-cornered. Founder instruction (2026-09-18): technical documentation uses Outfit for both headings and body text.

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
