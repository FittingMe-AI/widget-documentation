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
