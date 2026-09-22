# Documentation implementation provenance — unpublished

Recorded 2026-09-18 Europe/Paris (verification spans 2026-09-17 UTC).
Scope authority: `drafts/documentation-design.md`. Runtime source and executable
contracts take precedence over historical comments or instructions describing old
protocols. This file and the review evidence are excluded by `.mintignore`.

## Selected revisions and untouched sibling checkouts

`git fetch origin` completed in each owning checkout before source selection.
No sibling branch was switched, reset, built in place or edited. Selected
`origin/main` files were copied into ignored `.review/sources/` in this repository.

| Repository | Selected fetched `origin/main` | Main working-checkout HEAD at admission | HEAD-only / selected-only commits |
| --- | --- | --- | --- |
| widget | `24ed70754ee670dfb9bf40d487eb5115a168bbe8` | `e2ea4656fee9c0cdf024d1f5f155476c33d1c2a5` | 0 / 18 |
| b2b | `6d64a9529a4ee750b47e90d9ce4dac8d447d5ff2` | `19e04182ed7580c153bf48fe3e4ec4681e6d5dd9` | 1 / 97 |
| retailer-portal | `fa6d965e7feb12abbd2b3ace0518b050051a7ced` | `74ee22eb074b062f89b03d21ca0c2d0eb6eed51f` | 1 / 20 |
| widget-documentation | `d9557292ddab9c7b37979a714f2b45dc7485d8ef` | `4ee3f0b8a1f3ad31c0245009bdc5197e0078d0b2` | 0 / 2 |

Commands: `git rev-parse --show-toplevel`, `git fetch origin`,
`git rev-parse HEAD origin/main`, `git rev-list --left-right --count HEAD...origin/main`.
Existing reset changes, root guidance edits, deleted old guides and unrelated
worktrees were preserved. Remote documentation's two commits concern superseded
legacy pages; no merge/reset was used to overwrite the approved local reset.

## Technical assertion inventory

All paths below are relative to the named owning repository at the selected SHA,
except explicitly identified runtime evidence. Line numbers can be verified with
`git show <SHA>:<path>` and `nl -ba` in the owning checkout.

| Published claim | Supporting source locations |
| --- | --- |
| Loader script address and API base | retailer-portal/portal-service/src/snippets.rs:20,27; widget/infra/image/default.conf.template |
| Public widget address and declared framing origins | widget/infra/cibles.json; widget/loader/fittingme-loader.js:210; actual public response headers recorded separately |
| Portal public address | retailer-portal/infra/envs/prod/main.tf:283; actual `https://app.fittingme.ai/` response |
| Required loader values, closed attribute list, trimming, invalid-field rejection | widget/loader/fittingme-loader.js:218,259; widget/loader/lib/embed-protocol.js (`CONFIG_FIELDS`) |
| Exact image URL checks, protocol selection and no downgrade | widget/loader/fittingme-loader.js:315; widget/foundation/fil.ts:225; widget/foundation/garment-image.ts; widget/docs/contracts/loader-widget-protocol-v2.md:2525; widget/tests/sans-navigateur/garment-image.test.ts |
| Public-network image fetching constraints | b2b/backend/src/services/garment_image.rs:7,12; b2b/crates/url-guard/src/lib.rs:68,97,284,307 |
| Supplied image precedence, explicit exclusions, entitlement and structural-only bootstrap | b2b/backend/src/services/bootstrap.rs:132,173; b2b/backend/src/services/garment_image.rs:36; b2b/backend/src/routes/bootstrap.rs:28 |
| Immutable product/image session, acknowledgement | b2b/backend/src/services/journey_session.rs:253; widget/foundation/index.ts:326,1099; widget/foundation/amorcage-encart.ts:123; widget/docs/contracts/loader-widget-protocol-v2.md:2525 |
| Locale negotiation and default | widget/foundation/index.ts:451; widget/core/i18n.ts:20; widget/journeys/tryon/locales.ts; widget/tests/sans-navigateur/negociation-locale.test.ts |
| Trigger mode default and exact hôte token | widget/foundation/index.ts:335; widget/docs/contracts/loader-widget-protocol-v2.md:190 |
| Container resolution, duplication, default widget URL and generated query | widget/loader/fittingme-loader.js:1067–1165 (locations: 1067,1080,1100,1118,1135) |
| Explicit element addressing and destroyed identity | widget/loader/fittingme-loader.js:383,391,404 |
| Command acceptance, verdicts, undetermined boot handling | widget/loader/fittingme-loader.js:535,628,730,773; widget/tests/contract/fixtures/protocole/verdicts.json |
| Resolve snapshot, global on(), immediate replay, idempotent unsubscribe | widget/loader/fittingme-loader.js:985,1000; widget/loader/test (executable loader tests) |
| Four public milestones, exact fields, opening origin and pairing | widget/loader/fittingme-loader.js:1533,1578,1622,1661,1677; widget/docs/contracts/loader-widget-protocol-v2.md:1458 |
| Completion on closure, edge suppression and ordering | widget/foundation/index.ts:1176–1203 (locations: 1176,1183,1190,1193); widget/foundation/index.ts:1618 |
| Exact envelope, major and source/origin ordering | widget/foundation/fil.ts:225,260,302; widget/loader/fittingme-loader.js:1940; widget/tests/contract/fixtures/protocole |
| Sandbox and permissions | widget/tests/contract/fixtures/protocole/tag_attributs.json; widget/loader/fittingme-loader.js:43 |
| Negotiated geometry and positive opening counter | widget/docs/contracts/loader-widget-protocol-v2.md:2039; widget/foundation/disposition-tiroir.ts; widget/loader/fittingme-loader.js:1528 |
| Fullscreen layout, host scroll restoration, history and cleanup | widget/loader/fittingme-loader.js:797,1223,1251,1482,1494,1609,2232; widget/core/historique.ts; direct sample browser evidence |
| Catalogue data shape and preparation boundary | b2b/backend/src/models/product_catalog.rs:30,53; b2b/backend/src/services/bootstrap.rs:173; founder-approved brief (assisted handoff, not an import API) |
| Mounted bootstrap/session routes and public API key authentication | b2b/backend/src/routes/mod.rs:428,432 and final middleware composition; b2b/backend/src/middleware/auth.rs:89 |
| Domain write constraints, wildcard/apex semantics, runtime hostname matching | retailer-portal/docs/openapi.yaml:1005,3076; retailer-portal/portal-service/src/routes/api_keys.rs:513; b2b/backend/src/services/domain_rules.rs:41,97 |
| Admin/member roles and TOTP requirement | retailer-portal/docs/openapi.yaml:81,92; retailer-portal/spa/src/components/totp-enrolment.tsx |
| Actual key screen labels, one-time display, domains, rotation/revocation | retailer-portal/spa/src/i18n/fr.ts:234,248,271,290; retailer-portal/spa/src/components/key-dialogs.tsx; retailer-portal/spa/src/components/key-secret-dialog.tsx; retailer-portal/docs/openapi.yaml:884,928,978 |
| RFC 9457 body, error identifier and 400 validation_error | b2b/backend/src/error.rs:422,579,707,1450; b2b/crates/problem-details/src/lib.rs; b2b/backend/src/middleware/problem_normalization.rs |
| No analytics session capability; retailer-owned join | widget/docs/contracts/loader-widget-protocol-v2.md:1428–1520; exact exposed event implementation above |

## Official external references consulted

- Google data layer: https://developers.google.com/tag-platform/tag-manager/datalayer
- GTM Custom Event trigger: https://support.google.com/tagmanager/answer/7679219?hl=en
- GA4 Event tag: https://support.google.com/tagmanager/answer/13034206?hl=en
- DebugView: https://support.google.com/analytics/answer/7201382?hl=en
- Custom dimensions: https://support.google.com/analytics/answer/14240153?hl=en
- Consent setup: https://developers.google.com/tag-platform/security/guides/consent
- React Effects: https://react.dev/reference/react/useEffect
- Next.js client boundary: https://nextjs.org/docs/app/api-reference/directives/use-client

Read on this verification date. Recipes distinguish local emission, GTM processing
and GA4 ingestion. No GTM/GA4 account was configured or published.

## Implementation/deployment distinctions and discrepancies

- Selected `loader/AGENTS.md` and historical inline comments still discuss legacy
  `fittingme:` messages, old loader ownership and unresolved work that is already
  implemented. Published documentation follows executable loader/foundation code,
  P28/P29 amendments and current fixtures instead.
- Protocol major 3 is specific to image-bearing embeds. The documented catalogue
  path delegates selection to the loader; it is not a major-3 migration guide.
- The fetched widget and b2b protocol fixture sets disagree: 20 files compared,
  18 byte-identical; `loader-widget-protocol-v2.md` and `SHA256SUMS` differ.
  b2b carries a P30 amendment making `hôte` the default; selected widget
  executable code still defaults to `encart`. The JSON envelopes/verdicts are
  identical. This is source drift, not a new product policy. No sibling fixture
  was edited. Every button-bearing published example now sets its mode explicitly.
- Current trigger parsing silently falls back to `encart` for unknown values;
  docs list only supported values and state that measured fallback explicitly.
- Portal domain authorization does not mutate widget `frame-ancestors`. Both gates
  are documented; no claim that adding a portal domain automatically makes a
  new storefront frameable was made.
- Completion is emitted on closing a completed journey and is edge-suppressed,
  not a render-ready callback. Quickstarts and tracking explain that timing.
- Intended product permissions are not inferred from any older launch-time
  retailer restriction. Current service capability checks and observed runtime
  failures are reported separately.
- Public GET checks establish resource reachability, not successful retailer login,
  key creation, entitlement or a deployed source SHA. No production admin writes
  were made. Initial access is the approved human handoff; no unverified signup
  process or catalogue portal screen was invented.
- Examples are documentation-owned code. Review serves their exact HTML fences
  with environment/key/product/image substitutions in memory. Keys are neither
  stored in new source files nor written to logs or screenshots.

See `drafts/local-review.md` for measured checks, running processes and remaining
limitations. No commit, push, merge, deployment or production configuration change
is part of this delivery.
