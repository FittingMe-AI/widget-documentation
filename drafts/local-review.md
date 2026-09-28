## English retailer contract review — 2026-09-28

**Local implementation prepared; not published. Live generation is blocked by the VTON dependency.**

- English product review: http://localhost:8380/demo/
- French compatibility product review: http://localhost:8380/legacy/demo/
- English documentation: http://localhost:3214/reference/javascript#command-verdicts
- French documentation: http://localhost:3214/fr/reference/javascript
- Full migration mapping: `reference/compatibility.mdx`, “Temporary French compatibility”; single normative widget canon: `widget/docs/contracts/loader-widget-protocol-v2.md`, P31. P30 remains the earlier trigger opt-in decision.

All seven repositories use isolated `english-contract-*` worktrees under the main workspace's `.worktrees/`; each began **clean (0 paths)**. Dirty main checkouts and other reviews were preserved. At the initial review snapshot, no pushes, merges or deployments had been made; the subsequent dev rollout is recorded below. No external tracker writes were made.

### Implemented behavior

The new `/v4/fittingme-loader.js` returns English verdicts, fresh frozen English snapshots and one English object per event. Its closed `fittingme/4` wire supports both catalogue and supplied-image contexts. `/v2/fittingme-loader.js` temporarily preserves the French public API and majors 2/3. Shared lifecycle behavior remains responsible for coordination, history, fullscreen, teardown and completion. Explicit-element commands still never queue before bootstrap; old bare/get/handle/instances calls remain available.

`widget`/`host` are canonical trigger modes. Omission, empty and unknown values retain host mode; French spellings remain deprecated aliases. API language is independent of shopper locale. One entry-point version per page is supported: the updated loaders reject an incompatible second tag before registry mutation in either order. Historical cached v2 bytes cannot acquire the new rejection logic; mixing them after v4 remains unsupported and must be eliminated from the page together.

First-party host triggers, the public demo's event/analytics consumer and consent-overlay listener now subscribe to English facts. The Portal and Shopify consumer changes are recorded in the dev rollout below. Shopify `.invalid` deployment placeholders remain placeholders.

### Development rollout — 2026-09-28

| Repository | `dev` revision / verification |
| --- | --- |
| widget | PR [#235](https://github.com/FittingMe-AI/widget/pull/235), merge `3c1b901`; deploy run [36435309991](https://github.com/FittingMe-AI/widget/actions/runs/36435309991) succeeded. `/v4/fittingme-loader.js` and `/v2/fittingme-loader.js` each returned HTTP 200, JavaScript content type and `no-cache`; both served 20,917-byte files matched their local build hashes. |
| public site | PR [#55](https://github.com/FittingMe-AI/public-site/pull/55), merge `fe08a2a`; deploy run [36436091042](https://github.com/FittingMe-AI/public-site/actions/runs/36436091042) succeeded, including the real-demo smoke. Follow-up PR [#56](https://github.com/FittingMe-AI/public-site/pull/56), merge `3ad29da`; deploy run [36442457345](https://github.com/FittingMe-AI/public-site/actions/runs/36442457345) succeeded, including the Chromium smoke through every live ingress. Post-deploy Playwright checked the French ([dev page](https://fittingme-public-site-2mmu4zhn7a-ew.a.run.app/demo/)), English ([dev page](https://fittingme-public-site-2mmu4zhn7a-ew.a.run.app/en/demo/)) and Spanish ([dev page](https://fittingme-public-site-2mmu4zhn7a-ew.a.run.app/es/demo/)) demos: their copyable snippets carry `fr`, `en` and `es` respectively, and both live journey frames retain `loader_major=4`. The snippet comments are now English (`Sizing journey`, `Try-On journey`) on every page. The real sizing form opened; no body measurements were submitted. Playwright recorded Sentry envelope responses of HTTP 403; their cause was not investigated. |
| b2b | PR [#350](https://github.com/FittingMe-AI/b2b/pull/350), merge `1ecf897`; CI run [36435711938](https://github.com/FittingMe-AI/b2b/actions/runs/36435711938) passed. The English v4 golden fixture was added and checked against the widget-owned bytes. |
| Shopify | PR [#19](https://github.com/FittingMe-AI/shopify-app/pull/19), merge `929007d`; CI run [36435833626](https://github.com/FittingMe-AI/shopify-app/actions/runs/36435833626) passed 239 tests. `.invalid` placeholder hosts are unchanged; no app distribution was triggered. |
| Retailer Portal | PR [#147](https://github.com/FittingMe-AI/retailer-portal/pull/147), merge `1a3bf44`; CI run [36436797194](https://github.com/FittingMe-AI/retailer-portal/actions/runs/36436797194) passed all eight checks, including Rust/database, SPA and infrastructure gates. Dev deploy run [36438210031](https://github.com/FittingMe-AI/retailer-portal/actions/runs/36438210031) succeeded: the portal-service image deployed and the workflow health smoke passed. The live tenant-authenticated installation snippet was not checked; its dev route requires a retailer session. |
| Workspace | PR [#20](https://github.com/FittingMe-AI/workspace/pull/20), squash merge `0de58c8`; no CI checks were configured. The local architecture validation passed and the merged tree matches the reviewed note. |

The production site and documentation have not been promoted. Existing `/v2` integrations retain `fittingme/2` and `fittingme/3`; the canonical `fittingme/4` loader is available at `/v4` in the verified dev environment. This rollout does not prove Try-On result completion: the development VTON endpoint returned HTTP 404 in the earlier local review, no photo was uploaded, and storage read access was not verified end to end.

### Measured verification

| Scope | Result |
| --- | --- |
| Widget | Type checking and build pass; 1,116 browserless tests and 302 loader tests pass. Both built entry points are exercised, including all seven verdicts, replay, subscriptions, image major selection, mixed payload rejection and source/origin ordering. |
| Widget browser | Final affected run: 51 passed, 11 declared skips on Chromium representative desktop/mobile viewports. Earlier unchanged layout-reflow coverage also passed. Both built contracts complete the real widget UI against HTTP seam fixtures, with `closed` before one `completed` and no duplicate completion on reopen. This is not a real-provider result. |
| Mutation/adversarial | Null control passes; ten targeted mutations are caught: verdict translation, event/replay translation, duplicate delivery, legacy output, source, origin, geometry correlation, canonical protocol spelling, prototype assignment and cancellation. Initial cancellation mutation survived because the test accepted timeout; the test now requires immediate settlement. REFUTE tests reproduced and fixed `fittingme/04` acceptance and additive `__proto__` behavior at the English decoder boundary. |
| Hosting | Actual nginx 1.29 image and changed template: both exact loader paths match disk bytes, are minified/import-free with ES2018 build target, return `no-cache` and existing security headers, support ETag 304 and reject adjacent source/map paths. Two Journey artifacts remain; loaders are excluded from discovery/budgets. |
| b2b seam | 10 tests pass; 21 files, 225,999 bytes compared across selected widget/b2b copies, byte-identical. Legacy goldens preserved; English fixture added. |
| Public site | Build and all 264 unit tests pass; 21 browser checks cover generated snippets, product remounts, host triggers, container filtering and event subscriptions. Local GA queue assertions verify one open and one completion event; external analytics transport is intercepted. |
| Shopify | Full `make gate` passes: 239 tests plus formatting, types, lint, secret/contract guards and Terraform validation. Red tests first demonstrated the old loader path. |
| Retailer Portal | Formatting, ordinary Rust tests, Clippy and infrastructure gates pass. Database tier passes 419 tests on an owned disposable PostgreSQL instance, including all eight installation HTTP scenarios. Initial database gate required a non-empty synthetic password for its redaction probe; rerun passed. Snippet unit suite: 10 passed. |
| Documentation | Validator: 44 pages, 190 internal links, 66 anchors, 30 locale-identical code blocks, six complete HTML examples, zero errors. Mintlify desktop/mobile inspection: 28 page/viewport/locale checks, no document overflow; French mobile JavaScript page visually inspected. |

Browser harness failures were replayed unchanged before classification. The new widget harness initially triggered Chromium's local-network check because its top-level HTML was intercepted; serving its actual harness file resolved it. Public-site failures came from a missing pinned browser, an outdated trigger expectation and a test-double syntax error, all corrected. No browser security setting was disabled.

### Actual services and remaining verification

The local review product page serves changed public-site and widget artifacts. The separate local API at port 8382 reuses the existing cloud-backed review API build/configuration, with effective `STORAGE_BACKEND=gcs`; configuration is held in memory and credentials are not copied into review artifacts. Desktop (1440 px) and mobile (390 px) runs of both English and French entry points verified real API eligibility, session opening, consent screen, snapshots, open/close verdicts and one opening/closing fact in the selected language.

The dev product page listed in the rollout table above is a separate live-service check. It showed the English product page and v4 sizing/try-on embeds; only the sizing profile screen was opened. The three locale pages and their generated copyable examples were checked after public-site PR #56. No profile data, photo, or generation request was submitted.

**Real-result completion and analytics after a real generation remain unverified.** The development VTON Cloud Run endpoint returns HTTP 404 through both the authenticated loopback proxy and direct authenticated requests. An independent local VTON attempt with GCS storage fails because that build requires Cloud Run instance metadata for usage metrics. A newer core build also refused an older unrelated review database's retention state; no data was deleted and no startup guard was removed. The existing GCS review API build remains usable for the entry checks above, but its generation dependency is unavailable. No photo upload or real generation was initiated by this review. Remote photo read access and cloud result storage therefore have not been proved end to end.

No physical phone, mobile camera or QR handoff was exercised. The mobile checks are viewport emulation. The review depends on the existing development database/configuration, GCS, browser access to catalogue assets, and a restored real VTON dependency. Mintlify preview assets/fonts need network access; local search needs CLI login.

### Remaining release work

1. Verify the generated-snippet endpoint with an authenticated dev retailer session; the deployment run confirms only service health.
2. Restore the real VTON dependency and repeat a complete cloud-backed Try-On journey, including result completion and exact analytics counts. The current dev demo is not a completed Try-On review.
3. Review the docs branch. Publication to the main-only docs.fittingme.ai site needs explicit approval for that reviewed content; this dev rollout does not provide it.
4. Staging/main promotion and legacy removal remain separate decisions. Rollback retains the `/v2` tags and French callbacks; no removal date is set.

Raw non-secret check logs and screenshots are in `/private/tmp/english-contract-evidence/`. They support local checks; deployed state is evidenced by the linked workflow runs and live-page inspection above. The older review entries below remain historical.

---

# Local review — developer documentation rewrite, 2026-09-23

## French edition follow-up — 2026-09-24

The current English edition at `origin/main` has 22 routes. The French edition
mirrors those routes under `fr/` and is available in the local preview at
**http://localhost:3200/fr/introduction**. English remains the default locale.
All examples are unchanged and byte-identical to their English counterparts.

| Check | Result |
| --- | --- |
| Node 24 validator | PASS: 22 English + 22 French pages, 180 internal links, 56 source anchor references, 30 fenced blocks (15 per locale), six complete HTML examples; zero errors. |
| Rendered desktop pages | PASS: all 44 pages returned HTTP 200 with the expected H1 at 1440×1000; no page errors or document overflow; rendered code matches source. |
| Rendered French anchors | PASS: all 32 cross-page fragment links exercised in the rendered pages resolve to a heading. |
| Rendered mobile pages | PASS: all 22 French pages returned HTTP 200 at 390×844 with no document-width overflow; 24 tables and 15 code blocks remain reachable, including horizontal scrolling for wide content. |
| Language selector | PASS: switched the same Events page from French to `/reference/events` in English and back to `/fr/reference/events`. |
| Whitespace | PASS: `git diff --check`. |

Representative screenshots and machine-readable measurements are in ignored
`.review/french-localization-20260924/`. The exact renderer was Mintlify CLI 4.2.851
with Node 24.18.0. Chrome DevTools MCP was unavailable and the Playwright MCP
profile was occupied, so visual and responsive checks used an isolated bundled
Playwright/Chromium process. Preview fonts/assets require network access; local
search requires Mintlify CLI login. This is a documentation-only change, so no
product journey was rerun and the existing integration examples were not changed.

The founder explicitly requested publication of the French edition on
2026-09-24. The clean release worktree is based on published English commit
`9b885b409aeb7947329796b977ed9f01b8663a45`; the previously dirty documentation
checkout was left untouched.

The redesign documented below was subsequently published in merge `0ff3b23057d5245cb950d94dc80fe77ca7ee95ff`. For the later audience-wording correction and its current content fingerprints, see [audience review](audience-review.md). The evidence below records the earlier review.

## Review deliverable

- Documentation: **http://localhost:3003/introduction** (Mintlify 4.2.851, Node 24.18.0).
- Owning checkout: `/Users/ismail/Code/FittingMe.ai/widget-documentation/.worktrees/developer-redesign-20260923`.
- Branch: `codex/docs-developer-redesign-20260923`, based on `376bae6`; original starting tree was clean (0 paths).
- Scope: 22 pages across the six approved groups. Goals and acceptance exercise remain in `documentation-design.md`.
- The fresh review found substantive failures in the first draft. Corrections, individual finding dispositions and goal status are in `review-response.md`.
- Local draft only. No commit, push, merge or publication by this task.

## Current correction verification

| Check | Measured result |
| --- | --- |
| Repository validator | PASS: 22 navigation pages, 22 public MDX files, 90 internal links, 28 anchor references, 15 code blocks, three complete HTML examples, zero errors. |
| Rendered pages | All 22 pages rendered their exact H1 at 1440×1000 and 375×844 using Chrome DevTools MCP; 44 title/overflow checks, zero failures. |
| Visual inspection | Revised prerequisites desktop and React mobile inspected in screenshots. |
| Portal redirect | `/guides/integration` followed to `/start/prerequisites`, HTTP 200 and correct H1. Contact navbar links to `/troubleshooting/support`. |
| Example syntax | All three complete HTML examples parsed by validator; seven JS fragments parsed with Node vm; replacement React JSX compiled with esbuild. |
| React regression before correction | On staging, immediate close/destroy/remove returned `accepté` then `tiroir_ouvert`; disconnected embed remained registered open and both page overflow styles remained hidden after 300 ms. |
| React replacement against live widget | Production React and development Strict Mode: open drawer survived status-component unmount with its container connected; close restored scroll styles and closed state; remount received bootstrap. |
| Delayed availability and deadline | Status component survived mount/unmount while the loader API was unavailable, reconnected after restoration, and showed its retry message after the 15-second deadline without removing the embed. This is delayed API availability, not full network-failure coverage. |
| Public boundaries | Actual production `/tryon/` HTTP 200 with restrictive `frame-ancestors`; `/contact/` HTTP 404. |
| Whitespace | `git diff --check` passed. |
| New generations / phone capture | None in this correction pass. The supplied review independently reported successful catalogue/handoff and supplied-image staging journeys, plus a deliberate WebP failure. |
| Corrected-draft acceptance | Pending a new unfamiliar-developer exercise with normally provisioned retailer access and explicit storefront framing approval. |
| Physical phone / other browsers / search | Untested. Browser checks here used Chromium; local Mintlify search requires login. |

The unsafe cleanup has been removed from the documentation. The replacement requires a page-owned embed outside the React root and full document navigation for product changes. It does not prove safe in-place SPA teardown. Loader-command Back support and reliable unique-generation analytics remain product limitations documented beside the affected examples.

## Dependencies and side effects

The documentation preview uses the installed Mintlify CLI and local runtime; fonts may require external retrieval. Revised examples were checked against the real **staging** demo/widget/API, with its normally exposed publishable configuration kept in the browser. This pass opened and closed the demo drawer but accepted no consent, uploaded no photos and ran no generations. No private credential was read, and no account, key, domain, service or production configuration was changed. The isolated staging browser page was closed after confirming the drawer was closed and scrolling restored.

The underlying initial local-stack credential blocker is preserved below. It is not evidence of a completed local generation. Staging review evidence does not replace normal client onboarding, physical-phone testing or acceptance of the corrected draft.

## Initial local-stack attempts (historical)

Chrome DevTools MCP reported an occupied profile. The Playwright MCP profile was also occupied. An isolated Playwright process was used without disturbing either shared profile.

The exact custom-button HTML, with local product and service substitutions, initially reached bootstrap and opened the drawer against the existing demo gateway. Session loading failed with HTTP 403, `demo_request_unavailable`, because that gateway is not a general retailer API endpoint.

Automatic approval review rejected reading the existing API key from `/private/tmp/fittingme-cdn-session-evidence/serve-review.mjs` to connect the examples directly to the local API. The founder then explicitly authorised that exact local verification, with the key held only in memory. On the authorised attempt, the file was absent (`ENOENT`); its contents were never read. A bounded lookup for that exact filename under the workspace and temporary directory found no file.

The only subsequent credential attempt used the publishable value already exposed by the running local demo page. The actual local API returned **401, `unauthorized`**. No other private credential store was searched. No credential or private shopper data was written to the repository, diagnostics, or tool output.

The temporary examples server/proxy on 8620/8621 was stopped after that measurement. The documentation preview on 3003 remains running. A valid authorised local retailer key is needed through an approved local configuration path before the example journeys can be signed off. Do not request the key in chat.


## Reproducible document checks

```sh
export PATH="$HOME/.local/opt/node/bin:$PATH"
node scripts/validate-docs.mjs
mint dev --port 3003 --no-open
```

Local-only probes, the exact-example React bundle and browser render measurements are under ignored `.review/`; `.mintignore` excludes that directory and `drafts/` from publication. Current render measurements are in `.review/render-followup.json`. Existing `.review/docs-qa.json` and older screenshots belong to the first draft and are not current correction evidence.

## Current content fingerprints

| Page | Bytes | SHA-256 |
| --- | ---: | --- |
| `introduction` | 3600 | `5e2e0e99b3ee55a4240f8c62f1007762bf184402b43b2ba0b11574bcd754efa0` |
| `start/prerequisites` | 6354 | `8e7c3c86135d6522d61109eec96b5dceb184310ad9994ca4225eadd4fafa9fc7` |
| `start/quickstart` | 4869 | `1d8ee31dab37a1459bd9ace6111743ecc282fe2146ac8ec1ba4bfdcb36889806` |
| `integration/products` | 4268 | `e4810e68172b156b0bb16b5e103a46ffb4830ed1bb56c14c258d1d1995b653b4` |
| `integration/product-changes` | 4090 | `519c852d37d3a3e9fd468764ce7ca616081873ab76e9ed08e3d45f126043cfb7` |
| `integration/react` | 6369 | `4f21fcad299ceac23fa2fb80d8375c4c67fd5755f290d454207e9c895233b677` |
| `integration/appearance` | 5929 | `b6f4903a8bccd05e3c017bd31bdbdeb1c9a076f08414db5e688fe5d105cb6e7c` |
| `integration/analytics` | 4564 | `d738a3881b0d9f7705846ce99556658204daf6f8655b6c86cb2cf956d374b47f` |
| `integration/direct-embed` | 8797 | `c19d3fe8e8a38492f92a463ac1e901230368d07efef5ac679484b57f192600f5` |
| `testing/journey` | 4515 | `6360c6325a851a1e90d2d71c157b1152aced1b2db77c34eceb6e7cb797bf3b99` |
| `testing/security` | 4178 | `2ee2c0d80b372ad538a1cc1e4dea5b9ecdef4804d2998f9b4d1b0d05869ee182` |
| `testing/launch` | 3844 | `3cf90c6f739b276c212a5ac305ed434e71594dac1097792f4ea1fba778cdae88` |
| `troubleshooting/symptoms` | 7500 | `4fe384480b86ad1fbf4b18ab662d326141cd2d17758c196f19da63a915348e8e` |
| `troubleshooting/support` | 2268 | `717a6b6bd31e6cd5264f854f9636d2b50dbce060de0b620b76b7192bda786e04` |
| `reference/configuration` | 3455 | `afbe74898fa2e69ab697d0ac1323abb191edc83a3f42222efe6bcdd61a04e980` |
| `reference/javascript` | 5068 | `c1b0b2981807817379eab93f28c90b4beabfbefedb4ad803375bee6533e511e4` |
| `reference/events` | 4056 | `e1cdb5885c64a2a08a63fbf23200c1511c1847cc5153b43e1f6e9d8c61b333dd` |
| `reference/errors` | 5203 | `4547de5f75d9669c2de1b3660117c7d64590036439884ff98dabfe9f51f2f22f` |
| `reference/compatibility` | 3683 | `55207487f78e8c3c16d6a50db73463bceaf8de282b2247fdd4f068cf4929b32e` |
| `reference/protocol` | 5017 | `94097de0d4ca98b7b33d48544975d65f5a0f6087b37ae3b269803e2a9643132c` |
| `maintenance/releases` | 2308 | `e65f918e30baa1e786d31130b51edb30b7744e4624b56d88240b4818e913720a` |
| `maintenance/updates` | 3365 | `be8277fc735e01386ee6e164c16baa0e5065005b051bd8c147d270085cc86a53` |
