# Fresh-review response — 2026-09-23

The supplied review is accepted as evidence that the initial draft did not meet its integration acceptance criteria. Clean rendering and syntax checks were insufficient. The approved 22-page structure is retained; the local content is corrected, but publication and full goal acceptance remain pending.

## Findings and disposition

| Finding | Documentation correction | Remaining product or acceptance limit |
| --- | --- | --- |
| Storefront framing blocks new retailers | Prerequisites now require explicit FittingMe-managed framing approval, separately from key domains and the storefront CSP. Quickstart, security, errors, troubleshooting and launch checks agree. | This documents the existing onboarding process. Automatic synchronisation with key domains would be a separate widget/portal/infra change; none was made here. A normally provisioned client storefront still needs a fresh acceptance run. |
| Garment formats and limits missing | JPEG/PNG bytes, 20 MiB, three redirects, 8,192-pixel dimension ceiling, server access and CDN format negotiation are documented. Bootstrap eligibility is not input validation. | Generic temporary-unavailability messaging for permanent image failures remains a product limitation. No new generation was run in this correction pass. |
| Back fails after loader-command opening | Warning attached to the custom-button example, API, compatibility, React, troubleshooting and launch checks. Native trigger is the default. Normal-page direct integration owns its history. | The loader defect is unchanged. No universal SPA router adapter is claimed. |
| Completion timing/counting incorrect | Events and analytics now explain result-at-close timing, closure order, reload emissions, absence of unique IDs and teardown loss. Adapter event renamed to `fittingme_completed_result_closed`. | Public events cannot measure unique generations. The API has no close-message drain acknowledgement. |
| Close-and-destroy helper drops completion | Removed the helper; documented why closure alone is not a safe completion-delivery barrier. | In-place teardown still requires explicit route ownership and acceptance of event-delivery limits. |
| React cleanup strands scrolling | Replaced DOM-owning effect with a page-owned embed outside React and a subscription-only status component. Product/image changes use full document navigation. | This is a deliberately limited, executable pattern, not a general SPA integration. It requires control of a stable page shell. |
| Portal snippet and dead docs link | Explained image/catalogue and trigger differences; added `/guides/integration` → `/start/prerequisites`. | Portal source and the public documentation deployment were not changed. The redirect currently works in the local draft. |
| Domain checks and wrong error code | Added session-open timing, `origin_not_allowed`, `origin_underivable`; removed Sizing-only `capture_incomplete`. | Some errors require inspecting widget network responses; the host receives no universal error event. |
| Broken Contact URL | Navbar points to the support page; support uses the existing client contact and the email published on FittingMe's homepage. | The former public `/contact/` still returns 404; no public-site changes were made. |
| Phone locale differs | Widget language and the separate capture page's browser-selected language are distinguished. | No physical phone was exercised in this correction pass. |

## Verification of the corrections

- Independently reproduced the unsafe cleanup against the staging demo in Chrome: close accepted, destroy refused with `tiroir_ouvert`, removed container still registered as open, document/body overflow still `hidden` after 300 ms.
- Compiled the replacement JSX verbatim with React/React DOM. On the functioning staging widget, in both production React and development Strict Mode, unmounting the status component kept the open embed connected. Subsequent close restored both overflow styles and reported closed state. Remount received bootstrap state.
- Adversarial checks: unmount/remount while the loader API was unavailable, restore the API and reconnect; hold it unavailable past the 15-second application deadline and observe the explicit retry message without removing the embed. These checks cover delayed API availability, not a complete simulated network outage.
- REFUTE lens: this does not establish safe teardown when a router removes the page-owned container or its parent. The published recipe expressly excludes that ownership model; its earlier failure reproduction remains evidence against a general cleanup claim.
- All 22 pages rendered with matching H1 and no document overflow at 1440×1000 and 375×844 in Chrome DevTools. Prerequisites desktop and React mobile were visually inspected.
- Validator: 22 navigation pages, 22 MDX pages, 90 internal links, 28 anchor references, 15 fenced blocks, three complete HTML examples, zero errors. Seven JavaScript fragments parsed; replacement JSX compiled. Whitespace check passed.
- New portal redirect followed to the correct prerequisites H1 with HTTP 200. Navbar Contact resolves to the local support page.
- Public `/tryon/` responded HTTP 200 with the restrictive framing header; `/contact/` responded HTTP 404. No private credential was read.

The attached reviewer independently reported two successful staging generations (catalogue/handoff and supplied-image) and one deliberate WebP failure. Those are attributed to that review, not claimed as new runs here. This pass opened and closed the staging demo to test lifecycle; it accepted no consent, uploaded no photos, and ran no generations. It changed no account, key, domain, service, or production configuration.

## Goal acceptance

The review's original verdict remains the baseline until the corrected draft is independently retested: goals 1, 7 and 11 met (7 and 11 with gaps); 5, 6, 8 and 10 partial; 2, 3, 4, 9 and 12 not met. These corrections address the reported documentation failures but do not retrospectively turn the review into a pass.

Before accepting all goals, an unfamiliar developer must repeat the agreed exercise on a normally provisioned client storefront, including explicit framing approval, valid client access, the chosen navigation model, deliberate failure diagnosis, and launch checks. Physical-phone coverage, non-Chromium browser coverage and Mintlify search remain unverified. The default page-owned integration can be assessed separately from the documented product limitations; a requirement for unrestricted SPA teardown or loader-command Back support remains unmet.

No commit, push, merge or publication was performed. Review the functioning draft at http://localhost:3003/introduction.
