# Local founder review — 2026-09-18

## Current review: structural readability

All 19 public pages were reviewed and edited for structure. Start at
[the custom-button result check](http://localhost:3001/quickstarts/custom-button#check-the-result)
or [the documentation overview](http://localhost:3001/introduction).
The preview uses **HTTP** and reads this checkout.

- Quickstart setup, result checks, removal, onboarding, replacement, navigation,
  tracking and troubleshooting procedures now use numbered steps, with conditions
  and expected results attached to their actions.
- Focused subsections separate setup from verification, required from optional
  configuration, subscription behavior from cleanup, and completion timing from
  repeat-close behavior. Comparison and diagnostic tables support scanning.
- The 19 routes, page titles, existing heading anchors, sidebar, Outfit typography,
  branded CSS and all 23 code blocks are preserved. The code comparison covers
  39,352 characters including fences; no inline API/protocol identifier was lost.

Verification for this pass:

| Check | Result |
| --- | --- |
| Node 24 documentation validator | 19 routes, 19 public files, 86 local links, 6 anchor links, 23 code blocks and 3 complete HTML examples; no errors |
| Rendered documentation | 38 renders: all 19 pages at 1440 × 1000 and 390 × 844; HTTP 200, no compilation/page errors or document-width overflow |
| Rendered structure and examples | 194 numbered items and 133 table rows checked per width; all 23 rendered code blocks match source at both widths, 39,007 code characters compared per width; all 6 cross-page anchors resolve |
| Visual review | Desktop and mobile screenshots inspected for all 19 pages, including procedures, reference tables and code blocks |
| Mobile wide content | All 46 table/code blocks remain accessible: 34 scroll horizontally and the others fit; no clipping failures |
| Repository hygiene | `git diff --check` and whitespace checks across all 19 public MDX files pass; pre-existing modifications, deletions and new files preserved |

Evidence for this pass is in ignored `.review/readability-20260918/`, including
`preservation-results.json`, `render-results.json`, `changes.diff` against the
starting uncommitted pages, `overflow-results.json`, and `screenshots/`.

The initial extra overflow probe twice flagged the small protocol envelope block:
it compared the inner `pre` width rather than the visible code-block boundary.
Inspection confirmed that its content fits inside the outer block's padding.
The corrected visibility check passed; the long sandbox value was separately
confirmed scrollable. No documentation CSS or example was changed for that probe.

The previous documentation server had stopped. It was restored with Node 24.18.0
using `mint dev --no-open --telemetry false --port 3001` (session 38624), and the
38-page render check ran against that process. Chrome DevTools MCP and Playwright
MCP both reported occupied profiles; inspection used an isolated Playwright
Chromium instance instead. No existing browser profile was stopped.

Preview fonts/assets require network access; local search still requires Mintlify
CLI authentication. Mobile coverage is viewport emulation, not a physical-device
check. The runnable examples are unchanged and their earlier integration evidence
is retained below; no product journey or remote integration was rerun or newly
certified by this structural pass. No sibling repository, production configuration,
push, merge or deployment was changed. Publication awaits founder review and
explicit approval.

## Earlier integration review

The following records the preceding implementation verification. Its integration
process handles and service availability are historical, not fresh checks from
the structural readability pass above.

The approved 19-page documentation is implemented. All three complete HTML
quickstarts ran against the actual local widget/API and remote development
Try-On service, including decoded generated results and completion on close.
Nothing was committed, pushed, merged, deployed or changed in production.

## Open the review

| Deliverable | Running URL |
| --- | --- |
| Mintlify documentation | http://localhost:3001/introduction |
| Product with FittingMe's provided button | http://localhost:8600/provided-button.html |
| Product with the recommended custom button | http://localhost:8600/custom-button.html |
| Product with the direct fittingme/3 host | http://localhost:8600/direct-protocol.html |
| React guide component in development Strict Mode | http://localhost:8602/ |

The product pages show the existing Quiksilver Smoke Trail Cord garment and run
real services. They are the exact published HTML fences with local service,
public key, product and garment-image substitutions performed in memory. The
provided button explicitly selects `encart`; custom/direct examples select `hôte`.
The React page compiles the exact guide component with equivalent local address
substitutions. These pages contain no mocked widget or simulated journey.

For review, open a page, launch Try-On, accept the displayed terms, upload an
appropriate test photo, and select Start. Expect a generated result; closing it
produces the completion status. Reopening and closing that same result does not
produce another completion. Reload after using the sample's Remove Try-On button.
A slow or failed remote generation should be assessed as a service outcome, not
as an undocumented success state.

## Runtime and dependencies

| Process | Role and effective dependency |
| --- | --- |
| Mintlify CLI 4.2.851, port 3001 | Reads this checkout; Node 24.18.0; session 26207 |
| `.review/server.mjs`, ports 8600/8601 | Serves exact examples and locally built pinned widget; proxies `/v1/` to port 8352; session 47598 |
| `.review/react-server.mjs`, port 8602 | Compiles the exact JSX guide with installed React/esbuild, serving the same real widget/API; session 82130 |
| Existing API, port 8352 | Reused without restarting or changing configuration; GCS storage, development capture/result buckets, `VTON_API_URL=http://127.0.0.1:8358` |
| Existing retailer server, port 8350 | Supplies the established review product configuration to the in-memory example server at startup |
| Authenticated gcloud proxy, port 8358 | Development Cloud Run `vton-api`, project `fittingme-dev`, region `europe-west1`; session 67790 |

The generation proxy was absent during the initial generation check. It was
restored locally, then all three journeys were rerun successfully through the
running stack. No Cloud Run configuration or deployment was changed. The latest
observed ready service revision was `vton-api-00023-85k`, with 100% traffic and
image digest `sha256:b84204f697fa5c32b7625d71a02ae55f6c70474ff50bee1656540e968ba863cf`.
This service uses the development storage/job/inference dependencies configured
in Google Cloud. The local API's effective storage settings are GCS, including
`fittingme-dev-captures` and `vton-results-dev`; it does not point at a local-file
photo store while the generator reads GCS.

The API process comes from the existing b2b review worktree
`.worktrees/cdn-session-20260914` at
`04fd94ef16b489ee33619985df2cafd9c37509f3`. This runtime is older than the selected
source reference below. The measured end-to-end results establish compatibility
of the documented paths with this running stack, not that it runs the latest
b2b main revision. Portal configuration was source-verified, not exercised through
live administrator writes.

Internet access, functioning GCS/generation services and the local gcloud
credential session are required for generation. The existing review API and its
database must remain available. Product images and preview fonts/assets also
have network dependencies. The Mintlify preview's search needs CLI authentication;
page content, navigation and cross-links work without it.

## Measured verification

All final checks below returned exit code 0. Evidence files are local, ignored
and unpublished under `.review/`; their request paths redact session identifiers.
No shopper photos, generated images, live keys or capability URLs were captured
in the evidence. The journey input was the existing public demo's test asset.

| Check | Measured result | Evidence |
| --- | --- | --- |
| Structure and links | 19 navigation routes, 19 public MDX pages, 86 local links, 6 anchor links, 23 code blocks, 3 complete HTML examples | `scripts/validate-docs.mjs`; `.review/final-checks.json` |
| Desktop/mobile MDX | 38 rendered pages: 19 at 1440px and 19 at 390px; HTTP 200, titles/content present, no compilation errors or document-width overflow | `render-results.json`; `screenshots/` |
| Copyable quickstarts | All 3 rendered code blocks exactly match the MDX source at both widths; 24,791 characters compared per width; all 6 cross-page anchors exist in rendered DOM | `content-results.json` |
| Actual generated results | 3/3 quickstarts: consent, photo upload 201, launch 200, result fetch 200, decoded result image, close and completion; reclose suppresses duplicate completion; cleanup removes iframe | `journey-results.json` |
| Layout/security | All 3: mobile opening, desktop/mobile resize, closure, restored host scrolling, successful teardown; forged source messages rejected without poisoning the real channel | `adversarial-results.json` |
| Direct host history/focus | Escape and browser Back close; Back preserves the product route; focus returns after the owned history entry settles | `focus-check.mjs` terminal results |
| Multiple embeds | Ordered first close/second open, isolated destruction, replacement product and one remaining iframe | `multi-results.json` |
| React/SPA | Strict Mode, stable identity on unchanged props, product/image replacement, rapid selection, returned focus, open-drawer unmount and route remount; no page errors; changed image actually decodes | `react-results.json` |
| Loader failures/races | Real invalid key → `indéterminé`/`"401"` and refused open; invalid HTTP image → no iframe; disposal before a delayed loader finishes → no orphan for either loader example | `failure-results.json` |
| Analytics emission | Exactly one boot/open/close/completion in the full custom-button journey; denied consent emits nothing; no retroactive boot, cleared absent fields, idempotent unsubscribe | `journey-results.json`; `tracking-results.json` |
| Commerce recipe | Product isolation, attribution-window expiry, consent clearing, original event unchanged and commerce identity retained in the pure enrichment example | `commerce-results.json` |
| Validator mutation controls | Null control stays green; navigation count, missing route, missing anchor, invalid JavaScript, stale parameter and unlisted page each return 1; restored source returns 0 | `validator-mutation-results.json` |
| Repository checks | JSON/navigation validation, stale-content scan, whitespace/diff checks; existing branded CSS/logo/favicon unchanged | `final-checks.json` |

The first structure check was red with one page and no complete examples, before
implementation. Post-green adversarial lenses covered (1) lifetime and late
work, (2) source/origin security with an explicit attempt to refute channel
isolation, and (3) rendering/tracking boundaries. The direct sample's early
focus-return defect was corrected and verified with both Escape and browser Back.
The mutation round is evidence for its named axes, not a completeness claim.

One negative test originally intercepted the entire host HTML response. In that
harness the loader request failed before bootstrap (`net::ERR_FAILED`), twice on
unchanged content. It was replaced with a negative configuration mounted from the
actual served product page; real HTTP 401 and the documented boot result were then
observed. This was not recorded as a passing product test or an intermittent flake.

Chrome DevTools MCP was attempted first, but its browser profile was already in
use. The Playwright MCP hit the same profile conflict. The checks therefore used
isolated Chromium instances from the installed Playwright library. Repository
validation still runs through the documented local command above.

## Source revisions and discrepancy

The detailed assertion-to-file inventory, official Google references and source
selection commands are in [documentation-provenance.md](documentation-provenance.md).
Fetched references were inspected without switching sibling working trees:

| Owner | Selected source revision |
| --- | --- |
| Widget, built locally for this review | `24ed70754ee670dfb9bf40d487eb5115a168bbe8` |
| b2b technical reference | `6d64a9529a4ee750b47e90d9ce4dac8d447d5ff2` |
| Retailer Portal technical reference | `fa6d965e7feb12abbd2b3ace0518b050051a7ced` |

The widget and b2b protocol fixture directories each contain 20 files; 18 match
byte-for-byte. Their protocol markdown and checksum manifests differ: b2b includes
a P30 amendment changing the default trigger to `hôte`, while the selected widget
implementation still defaults to `encart`. Wire JSON fixtures match. Published
references describe the executable widget, and examples set the trigger mode
explicitly. No sibling code or fixtures were changed to hide this discrepancy.

## Limits of this review

- External GTM processing and GA4 ingestion were not configured or claimed. The
  data-layer emission boundary was measured separately. Store-specific checkout
  correlation requires that retailer's existing analytics and test checkout.
- Browser coverage is Chromium with desktop/mobile viewport emulation. A physical
  phone, Safari and Firefox remain retailer go-live checks, not claimed passes.
- React behavior ran in a real development React root. A full Next.js application
  build/router was not created; the documented client boundary and effect rules
  were checked against official framework documentation.
- Initial account provisioning, portal admin changes and FittingMe-assisted
  catalogue preparation were verified from the approved brief/current sources.
  They were not performed against a live retailer account. The three required
  quickstarts all use supplied garment images and completed actual journeys.
- Public loader/widget/API/portal reachability checks do not establish deployed
  source identity or automatic framing approval for every retailer domain.
- If any review process or its dependencies changes, rerun its affected journey
  before reusing this working-review claim. Generated assets and evidence are
  intentionally local; `.review/` depends on this workspace's installed tooling
  and existing private review configuration and is not a distributable test suite.

All authored source changes are confined to widget-documentation. The initial
reset deletions, existing AGENTS.md edits, design brief and unrelated worktree
were preserved. Publication awaits explicit founder approval after this review.
