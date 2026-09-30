## English contract source selection — 2026-09-28

Sources were fetched before implementation. These are the selected starting revisions, not deployed revisions. Each corresponding isolated worktree started clean (0 paths).

| Repository | Selected revision |
| --- | --- |
| widget | `9161fa3af2f7f10061bc116b0f3317da66b6f7b1` |
| b2b | `5bc35a176a731c7855dfd49ec223f4bcc543ea19` |
| public-site | `97188e1e752e4a01544ef91297972c9fd8f5951e` |
| retailer-portal | `fa3c46ab5d38c1e026fb9924b6f5af369a61b686` |
| shopify-app | `40ce051d7f984939f7ef6d9452543ec3af08fa97` |
| widget-documentation | `82b697d9a9c4c82635ef87420074f25d879815ea` |
| workspace | `cc43df31bf9fe6397bd9cda62258ea1e92827543` |

The runtime mapping is normative in widget's existing loader/widget canon, P31; historical French sections and goldens remain unchanged. Canonical examples in both documentation languages use English identifiers. The actual checks and the unresolved real-generation dependency are recorded in [local review](local-review.md). Neither examples at production URLs nor local source success prove that v4 is already deployed.

Current source fingerprints (post-migration, independent of Git commit metadata):

| Source | SHA-256 |
| --- | --- |
| `widget/loader/fittingme-loader.js` | `3b590d1bde4782028a53ef9ad551b3dffe4fdd49a78eff4b5705b4419db0e55c` |
| `widget/foundation/fil.ts` | `3d2b2544ee0d90375daafa13e8044e6dd536f1c0696b5bde40a2f312afeb4ea8` |
| `widget/foundation/retailer-contract.ts` | `82ff15422460d1bacc98be4aa1cb8298cb28bd84d0672ced0497cb63dbff7d99` |
| `widget/docs/contracts/loader-widget-protocol-v2.md` | `5f2e7bab1d8124eeb4f6bc00ba2e694650f03c3ff420d795eb1cddf348520d8a` |
| `public-site/site/src/js/host-trigger.js` | `0a1c20d466ca572963f7bd5570065e5e7eb71973e27136f2e2e56b7dde8f9b09` |
| `public-site/site/src/js/public-demo.js` | `ff2270a20eea897fa58d86a352beaea36a6cf48bccb6816c4e11cf09aca8d85f` |
| `public-site/site/src/js/analytics-core.js` | `89833b04865058d55af055a032e78930705306e92917744e48d49d4bd2b03198` |
| `retailer-portal/portal-service/src/snippets.rs` | `e5bf2ec529a9d669a37a45841e47813dd127ffb00ce6077360ac74b666644e8e` |
| `shopify-app/extensions/fittingme-tryon/blocks/tryon.liquid` | `8aff6da80ca236040369329ca69876ce7172bbc44528bf5f98e7187d3f2a72a3` |

## Public demo snippet alignment — 2026-09-28

The public demo's copyable snippet now uses the shopper locale of its page and
English journey comments. Source: public-site PR [#56](https://github.com/FittingMe-AI/public-site/pull/56),
tested commit `a22a37efe39f056a5627330226f415fbe4b23e51`, squash merge
`3ad29da59aedf9028fb146e6834ee71d24770091`. The merged tree matched the tested
commit tree; dev deploy [36442457345](https://github.com/FittingMe-AI/public-site/actions/runs/36442457345)
completed its build, Terraform apply, and real-demo Chromium smoke.

Claim anchors: `public-site/site/scripts/public-demo-contract.js:438-465`
builds the two v4 journey tags with the page locale and English comments;
`public-site/site/scripts/public-demo-contract.js:840` passes the renderer locale
into the snippet builder. Generator and generated-page guards are in
`public-site/site/scripts/public-demo-contract.test.js:283` and
`public-site/site/scripts/integration-snippet.test.js:226`.

Post-deploy Playwright observations on 2026-09-28: `/demo/` carries `fr`,
`/en/demo/` carries `en`, and `/es/demo/` carries `es`; both embedded frames on
each page carry `loader_major=4`. The sample content changed, but the
documentation's normative API examples and compatibility mapping did not.

## Documentation staging deployment — 2026-09-28

Documentation PR [#10](https://github.com/FittingMe-AI/widget-documentation/pull/10)
was squash-merged to `main` as `dac93c4205e4df086a7ae2f74e51c7cfeaf1e43c`.
GitHub deployment [6714173180](https://github.com/FittingMe-AI/widget-documentation/deployments/6714173180)
reports success in environment `staging`, targeting `https://docs.fittingme.ai`.
The staged route redirected to an “Access Restricted” page in Playwright; the
deployment status is confirmed, but rendered page content could not be
independently inspected without an access code.

---

# Documentation source evidence — 2026-09-23

## French edition — 2026-09-24

The French pages under `fr/` translate the canonical 22-page English edition at
documentation commit `9b885b409aeb7947329796b977ed9f01b8663a45`. They add no
integration, API, protocol, lifecycle, service-availability, or browser-support
claims. Every fenced code example remains byte-for-byte identical to its English
counterpart; locale-specific navigation and links point to the translated route
and translated heading anchor. Validate the language tree and code parity with
`scripts/validate-docs.mjs`. Mintlify's current language navigation format was
checked against its official guide:
https://www.mintlify.com/docs/organize/navigation.

## Selected local revisions

- Documentation isolated checkout: `codex/docs-developer-redesign-20260923`, based on `376bae6`. Starting state: **clean (0 paths)**. Original dirty checkout and other worktrees preserved.
- Widget source: `/Users/ismail/Code/FittingMe.ai/widget/.worktrees/recommencer-review-20260922`, HEAD `52155bf5ff0259023d24b65307d9c9e304791720`.
- b2b source: `/Users/ismail/Code/FittingMe.ai/b2b`, HEAD `19e04182ed7580c153bf48fe3e4ec4681e6d5dd9`.
- Retailer Portal source: `/Users/ismail/Code/FittingMe.ai/retailer-portal`, HEAD `74ee22eb074b062f89b03d21ca0c2d0eb6eed51f`.

These are local source selections, not claims about remote branch currency or deployed revisions. The exact read files are fingerprinted below because an owning checkout may contain local edits. No sibling source was changed by this task.

## Claim anchors

| Documentation claim | Owning source |
| --- | --- |
| Required inputs, closed attribute list, image validation and per-embed major | `widget/loader/fittingme-loader.js:218`, `:320`, `:1162` |
| DOM identity, command verdicts, bootstrap guard | `widget/loader/fittingme-loader.js:133`, `:391`, `:535` |
| `resolve()` state, synchronous bootstrap replay, unsubscribe | `widget/loader/fittingme-loader.js:985`, `:1000` |
| Missing container and duplicate mounting behaviour | `widget/loader/fittingme-loader.js:1130` |
| Events, height, geometry negotiation | `widget/loader/fittingme-loader.js:1519`, `:1530`, `:1578`, `:1643`, `:1663`, `:1693` |
| Image URL and immutable product/image context | `widget/docs/contracts/loader-widget-protocol-v2.md:2532` (P29) |
| Direct message inventory and geometry fields | `widget/docs/contracts/loader-widget-protocol-v2.md:2010`; `widget/foundation/fil.ts:69`, `:225`, `:442` |
| Locale negotiation and French fallback | `widget/foundation/index.ts:452`; `widget/core/i18n.ts:20`; `widget/core/locales.ts:22` |
| Admin key creation, show-once, domains, rotation | `retailer-portal/docs/openapi.yaml:885`, `:935`, `:1005`, `:3071` |
| Actual French portal labels | `retailer-portal/spa/src/i18n/fr.ts:240`, `:273`, `:299` |
| Exact-host/wildcard/apex/localhost distinction | `b2b/backend/src/services/domain_rules.rs:360` (executable matching table) |
| API-key header | `b2b/backend/src/middleware/auth.rs:47` |
| Problem Details and integration-relevant codes | `b2b/backend/src/error.rs:348`, `:395` onwards |

The prose intentionally does not claim a public catalogue-management API, live product setter, size setter, immutable loader release pin, numeric browser-version promise, or account-specific retention/SLA.

## Exact source fingerprints

| Source | Bytes read | SHA-256 |
| --- | ---: | --- |
| `widget/loader/fittingme-loader.js` | 123142 | `c63b6b285811111bb2885498821d82c9094628a2ff54aac8d5df72ecfe5878a1` |
| `widget/loader/lib/embed-protocol.js` | 12618 | `f449afd1b16de6114a3a98f76614e25e42524ffeb1cc833cf2530808e1d8c292` |
| `widget/foundation/fil.ts` | 19396 | `431babc0d4f60b540ae674c11cd5260de5ba4f7b6f6ce40a7dc4780dc3908eea` |
| `widget/foundation/index.ts` | 89428 | `6857ad356cc4c891bbc1206d7c066bca959bc7baecfe4f271081f2b016296db8` |
| `widget/core/i18n.ts` | 5597 | `1a061c1a02765e42089b0706cbb3cbc04a210c67bb91e052cfa87b7596b83065` |
| `widget/core/locales.ts` | 1495 | `d00e09c4cb2429813ef979d7eeffc6858b9f7ff9f63251b5ecbcacecbc88192e` |
| `widget/docs/contracts/loader-widget-protocol-v2.md` | 201086 | `ab3ea514227773fe1e51aea962a67205c77c3623999e70888dd39868199b5c82` |
| `retailer-portal/docs/openapi.yaml` | 149262 | `4dcc3151db0deb94bc1f24a1f0a6be39a8cb6c9765a736ca48e3b34428775bdf` |
| `retailer-portal/spa/src/i18n/fr.ts` | 27735 | `eaf8e612c1c0b5d695b30b84c9a46a5f256126f641dce93ce57c20809f7271f0` |
| `b2b/backend/src/error.rs` | 77740 | `0446179da5c8635f4a18fc8a47adf6339c543eb3da2ba5d0c19c66049d79257c` |
| `b2b/backend/src/middleware/auth.rs` | 28122 | `97eb74ffd05f00f39f77d200c6aa3b2cad8811b58fd7c148bac1f6622a87e393` |
| `b2b/backend/src/services/domain_rules.rs` | 31160 | `510173dcbc7682303368423821957d9859e5a1a1920062f9f052d7b34eb25e7e` |

## External primary references

- React effect setup/cleanup and development remount behaviour: https://react.dev/reference/react/useEffect (checked 2026-09-23; linked from the guide).
- Mintlify navigation schema: https://www.mintlify.com/docs/organize/navigation (checked 2026-09-23; confirmed in the local rendered site).

## Verification scope

See `drafts/local-review.md` for actual runtime observations. Source verification does not replace a completed browser journey or establish service rollout dates.

## Fresh-review corrections — 2026-09-23

The original b2b checkout predates some deployed behavior. For these corrections, selected the already-available immutable commit `9f1cafaa806f45c47d7883d83c1012122a9928f7` (the local `origin/main` ref at inspection), using `git show <sha>:<path>`. No fetch or claim of current remote currency is implied. The widget selection remains the worktree/HEAD above.

| Corrected claim | Evidence |
| --- | --- |
| Separate framing approval | `widget/infra/cibles.json:50-59`; public `https://widget.fittingme.ai/tryon/` HEAD: HTTP 200, `frame-ancestors` permits localhost, FittingMe, Sarenza and Shopify origins, not arbitrary retailers. |
| JPEG/PNG, byte/redirect/dimension bounds | b2b selected commit: `vton-service/src/download.rs:12-15`, `vton-service/src/image.rs:15-19`, `:183-197`; URL structural checks `backend/src/services/garment_image.rs:9-29`. |
| Domain refusal at session opening | b2b selected commit: `backend/src/services/journey_session.rs:112-148`; `backend/src/error.rs` OriginRefused mapping to `origin_not_allowed` and `origin_underivable`. |
| Completion attached to close, order, rearming | `widget/foundation/index.ts:1195-1257`; report's live completion/reload checks. |
| Immediate destroy refusal and scroll lock | Independent staging reproduction in this task, reproduced before replacing the example. |
| Loader-command Back gap | Supplied review's live native/custom comparison; no product fix claimed. |
| Separate capture locale | Current widget source `capture/try-on-handoff.js:249-256`, explicit `lang` when present, otherwise navigator language and fallback. Normal handoff does not inherit loader locale; supplied review observed the difference. An older b2b copy was read first, then superseded by this current owning source. |
| Contact address | https://fittingme.ai/ publishes `contact@fittingme.ai`; public `/contact/` HEAD returned 404. |

Additional b2b source fingerprints at the selected immutable commit:

| Source | Bytes | SHA-256 |
| --- | ---: | --- |
| `vton-service/src/download.rs` | 21024 | `48487308dda5af3d29563a440efe9e6060292ed6dcd5e4f1c326ade713ee46f8` |
| `vton-service/src/image.rs` | 19145 | `4ae8474b510a7fa2ac44d91c4471f1b5a6d5ab1faed6abd89d0d18e1e37e9334` |
| `backend/src/services/garment_image.rs` | 1795 | `ee3469dd7e5a582b96b7c25d818295919a7ae6467ee507cba2e9d929537a4904` |
| `backend/src/services/journey_session.rs` | 86750 | `5a882d211ec971d13c716993e9ada74f8daf2294d5ba2ad9ccc28d718f66912d` |
| `backend/src/error.rs` | 81953 | `9f33b1a81c1f3b9d487cd84ad564921e8f66d5ab9a3dea1f791beda0c3605f06` |

See `review-response.md` for disposition and `local-review.md` for current verification and remaining acceptance limits.

## Audience wording correction — 2026-09-23

Source: the founder's clarification in this task that the reader may be an in-house developer or an external integrator working for the retailer. The retailer is FittingMe's customer and must not be assumed to be the developer's client. Fourteen public pages, the design brief, README and writing guidance were aligned with that instruction. No technical contract or executable example changed; all 15 code fences and `docs.json` match published merge `0ff3b23057d5245cb950d94dc80fe77ca7ee95ff`. See `audience-review.md` for the current verification and content fingerprints.
## Multiple garment pictures — local unpublished draft, 2026-09-29

Selected starting revisions: widget `f1df69bddc21b5616da5d6a73ea47f88be6b1e8f`, b2b `1ecf89748deb6876f1a1c5ef582e70cc8cab466a`, widget-documentation `44ddd427e375217e42748f830bbd10ce6135ed74`. The plural implementation is being edited locally in sibling repositories; these commits alone do not prove the new contract. The approved ticket is the local “Multiple garment pictures as input” PRD and `b2b/docs/intake/multiple-garment-pictures/local-design.md`.

Draft claim anchors under active implementation: widget `loader/fittingme-loader.js` (plural parse and conflict precedence), `foundation/fil.ts` (v5 message recognition), and `foundation/index.ts` (plural bootstrap transport); b2b `backend/src/routes/bootstrap.rs`, `backend/src/services/journey_session.rs`, `backend/src/services/try_on_request.rs`, and `vton-service/src/config.rs` (source and provider boundaries). Recheck final lines, selected revisions, tests and actual environment availability before any documentation commit or publication. The existing published v4 behavior remains described separately in the release and direct-protocol pages.

Affected unpublished pages: English and French quickstart, prerequisites, products, configuration, appearance, browser compatibility and troubleshooting, plus release compatibility; the deprecation notice is in `drafts/garment-image-url-deprecation.md`. Node 24 validation and local review results are recorded in `drafts/local-review.md` below. No real provider, deployment or hosted Mintlify rendering proof is claimed for v5.

## Pull-request source revisions — 2026-09-30

Reviewed implementation: b2b `41049569d5ba8dca053a31158851188390386bbf` and widget `ab677c6a6cebfeb9d023efe8414e418ec188cd7c`.
These branch revisions include the paired plural contracts; they are not deployed
release claims. Live local original-input generation, Gemini preparation and
prepared-cache generation passed using the repository model fixture and two
verified views. Evidence is recorded in b2b's ticket-scoped local-verification.md.
The portal upload interface is not part of this change.
