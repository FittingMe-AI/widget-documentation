# Integration documentation design

Final design brief from the founder's documentation design interview, started
2026-09-17. The scope and 19-page structure are agreed; authoring the replacement
documentation remains the next phase. This brief is excluded from the Mintlify
site by `.mintignore`.

## Purpose

Help developers integrate FittingMe virtual try-on, configure its parameters and
implement tracking. The previous documentation has been reset locally;
replacement content will follow the agreed design.

## Agreed decisions

### Scope

- Cover the Try-On Journey only in this version.
- Defer Sizing and size-recommendation documentation because that product area
  is not fully developed yet.
- Apply this scope to onboarding, all integration paths, examples, parameters,
  tracking and troubleshooting.

### Integration approaches

- Cover the widget with its provided Journey Trigger.
- Recommend the loader's JavaScript API when a retailer supplies its own button.
- Provide a complete direct-protocol guide for advanced integrations, including
  the responsibilities otherwise handled by the loader.
- Teach direct protocol integration with `fittingme/3` only, using a supplied
  garment image URL. Catalogue integration is taught exclusively through the
  loader; no direct `fittingme/2` implementation guide is included.

### Navigation

- Organize the documentation by integration path.
- Provide separate quickstarts for the provided button, a custom button through
  the loader API, and direct protocol integration.
- Keep configuration, tracking and troubleshooting in shared sections.
- Maintain one authoritative explanation of each parameter and event, linked
  from the quickstarts.
- Keep 19 focused pages across the six sections listed below.

### Code examples and frameworks

- Use complete plain HTML/JavaScript examples for all three quickstarts.
- Use a supplied garment image URL in every quickstart so developers can reach
  a working Try-On integration before importing a catalogue.
- Add a React/Next.js integration guide covering mounting, product changes and
  cleanup.

### Storefront situations

- Cover product pages, dynamic product/color/image changes, SPA navigation and
  multiple embeds in detail.
- Include a focused guide for multiple embeds.
- Product-listing grids and quick-view modals are deferred.

### Tracking examples

- Explain the available retailer-facing journey events with a vendor-neutral
  event handler.
- Include a Google Tag Manager/GA4 recipe for forwarding those events.
- Show subscription cleanup and avoid duplicate subscriptions.
- Add an optional recipe connecting Try-On events to the retailer's existing
  add-to-cart and purchase analytics. Explain correlation and its limits;
  commerce events come from the retailer, not from FittingMe.

### Integration verification

- Provide a go-live checklist with concrete browser steps and expected results.
- Cover opening and closing, focus return, product changes, multiple embeds,
  failure handling and tracking.
- Downloadable Playwright suites and an interactive diagnostics page are
  outside this version's scope.

### Onboarding

- Provide a full onboarding walkthrough, from obtaining access through
  configuring the first product.
- Cover how developers obtain their public retailer key, authorize relevant
  origins and prepare usable product data, rather than assuming these are ready.
- FittingMe provides initial access. The retailer's admin then configures keys
  and domains in the Retailer Portal; document that handoff explicitly.
- Include two complete first-product walkthroughs: Try-On with a supplied
  garment image URL, and Try-On with a catalogue product.
- Keep the catalogue walkthrough separate from the three integration quickstarts.
- Catalogue onboarding is FittingMe-assisted: explain what product data the
  retailer supplies, the setup handoff, and how to use the prepared catalogue
  with the widget.
- Catalogue API administration is outside this documentation's scope.

## Agreed page map

The following 19-page map translates the agreed scope into an authoring plan.
Page names are working titles. This brief does not add unwritten pages to the
site navigation.

| Section | Page | What the developer will accomplish |
| --- | --- | --- |
| Start here | Overview and integration options | Understand virtual try-on and choose the provided button, a custom button with the loader, or direct `fittingme/3`. |
| Start here | Access, keys and domains | Follow the initial-access handoff from FittingMe, then use the portal to configure the appropriate keys and authorized domains for development and production. |
| Start here | Prepare your first product | Choose a stable product identifier and a usable garment image URL; understand the inputs needed before copying a quickstart. |
| Quickstarts | Use the provided button | Run a complete plain HTML/JavaScript example using the FittingMe loader and a supplied image. |
| Quickstarts | Use your own button | Run a complete example using the loader API, including boot outcome handling, open/close behavior and focus return. |
| Quickstarts | Integrate with fittingme/3 | Run a complete direct iframe/protocol example using a supplied image, with the required origin checks and lifecycle behavior. |
| Integration guides | Product and image changes | Keep the embed tied to the selected product/color/image; replace and clean up the embed when required by the contract. |
| Integration guides | Multiple embeds | Address the correct embed, coordinate drawers and subscriptions, and remove embeds safely. |
| Integration guides | React and Next.js | Handle browser-only initialization, mounting, rerenders, navigation and cleanup using the loader. Link advanced consumers to the direct-protocol contract. |
| Integration guides | Use a prepared catalogue | Supply the required product data to FittingMe, complete the handoff, then integrate prepared catalogue products through the loader. |
| Reference | Configuration parameters | Find each supported input's purpose, type, requiredness, defaults, constraints, example, precedence and whether changing it requires a new embed. Distinguish loader attributes from direct-iframe query parameters. |
| Reference | Loader JavaScript API | Find embed addressing, commands, return values, event subscriptions, unsubscribe behavior and destruction semantics. Distinguish command acceptance from observed completion. |
| Reference | fittingme/3 protocol | Find the exact envelope, message directions and payloads, initialization sequence, origin/source validation, layout coordination and lifecycle obligations. |
| Reference | Events | Find exact event names, payloads, meaning, timing, replay behavior and transport mapping, with one authoritative definition of each observable event. |
| Tracking | Track Try-On usage | Connect the documented events to a vendor-neutral handler, add retailer-owned product context and manage subscriptions without duplicate listeners. Explain the distinction from automatic FittingMe tracking. |
| Tracking | Google Tag Manager and GA4 | Adapt the handler to a data layer and GA4 events, then verify delivery with the analytics tools. Preserve the retailer's consent controls. |
| Tracking | Connect commerce analytics | Optionally correlate Try-On usage with existing retailer add-to-cart and purchase events; explain the limits of correlation and the required retailer-side data. |
| Testing and troubleshooting | Troubleshoot integration problems | Diagnose missing buttons, boot failures, rejected configuration, image loading, framing/origin errors, lifecycle mistakes and duplicate analytics using observable symptoms and concrete checks. |
| Testing and troubleshooting | Go-live checklist | Execute browser checks with expected results for both button approaches and direct protocol, including mobile behavior, focus, product changes, multiple embeds, failures, tracking and relevant storefront security configuration. |

## Authoring guidance

- Write in English for the developer implementing the storefront integration.
- Explain each task with prerequisites, copyable code, expected behavior and a
  link to the relevant reference. Keep advanced detail out of the first steps.
- Provide a complete runnable HTML/JavaScript example for each quickstart,
  supported by short explanations of the important sections.
- Use placeholders for retailer keys and product data; never embed real
  credentials, retailer data or shopper information.
- Preserve exact API and protocol identifiers in code while explaining their
  meaning in plain English.
- Keep one authoritative parameter and event reference. Recipes link to those
  definitions instead of copying tables that can drift.
- Explain image URL requirements and the relationship between product identity,
  selected garment image and embed lifetime with concrete examples.
- Implement required message validation, keyboard/focus behavior and cleanup in
  the complete direct-protocol example; a custom button still opens the
  FittingMe Try-On interface.
- Keep FittingMe-assisted catalogue preparation explicit. Do not imply that the
  developer imports a catalogue through an API or manages it in a portal screen
  that has not been verified.
- Explain only the tracking signals the integration exposes. A journey event
  is not automatically a purchase, a billable unit or proof of conversion lift.
- Retain the existing Mintlify platform and FittingMe presentation while
  rebuilding the content and navigation.

## Authoring checks

- Verify exact parameters, defaults, API calls, protocol tokens and observable
  behavior against the selected widget implementation and contract fixtures.
- Verify onboarding UI steps, supported domain formats, service URLs and the
  catalogue handoff before giving operational instructions. Code snapshots
  alone do not establish what is deployed or available to a retailer.
- Read the current official analytics documentation when writing the GTM/GA4
  recipe.
- Validate the replacement navigation and links, render the MDX locally, and
  exercise the integration examples against functioning services before
  presenting the finished documentation for review.
- Keep the work local until the founder reviews the finished documentation and
  explicitly authorizes publication.

## Source observations to carry into the rewrite

- The widget repository owns the loader; older documentation guidance still
  points to its former b2b location.
- The fetched widget `origin/main` at
  `24ed70754ee670dfb9bf40d487eb5115a168bbe8` describes `fittingme/3` for embeds
  carrying a garment image and major 2 for embeds without one, in
  `docs/contracts/loader-widget-protocol-v2.md`, section P29. Verify this against
  the selected implementation before writing examples; do not present major 3
  as a blanket replacement without evidence. The documented direct-protocol
  path is deliberately limited to major 3; the catalogue walkthrough delegates
  protocol selection to the loader.
