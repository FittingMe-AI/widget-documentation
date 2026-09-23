# Local review — developer documentation rewrite, 2026-09-23

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
