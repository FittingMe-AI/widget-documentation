# Developer documentation design — approved 2026-09-23

The founder approved the 12 goals, the practical acceptance exercise, and then the six-group structure in this task. Content is written from those decisions, without adapting the previous documentation prose. Existing hosting/brand infrastructure is retained; redirects preserve incoming links without determining the new structure.

Scope: client developers integrating virtual try-on. Sizing remains outside this publication. Portal coverage is limited to access, keys, domains, and integration prerequisites. Internal service implementation and administration are outside the guide.

## Agreed goals

| # | Approved goal | Implemented location |
| --- | --- | --- |
| 1 | [x] Understand what they are integrating | introduction |
| 2 | [x] Determine whether it fits their storefront | introduction; reference/compatibility |
| 3 | [x] Know everything needed before starting | start/prerequisites |
| 4 | [x] Reach a first working integration through one clear path | start/quickstart |
| 5 | [x] Adapt the integration to the actual storefront | integration/* |
| 6 | [x] Find precise technical answers | reference/* |
| 7 | [x] Handle credentials and shopper data correctly | testing/security |
| 8 | [x] Verify that the integration works | testing/journey |
| 9 | [x] Diagnose problems and recover | troubleshooting/*; reference/errors |
| 10 | [x] Launch and maintain confidently | testing/launch; maintenance/* |
| 11 | [x] Find the right answer quickly | Six task groups; concise sidebar labels; contextual links |
| 12 | [x] Trust what they read | Source audit; executable example checks; this acceptance record |

The checkboxes record approval of the goals, not a claim that final acceptance has passed.

## Approved acceptance exercise

A developer unfamiliar with FittingMe uses only the documentation and normally provisioned access to integrate a representative storefront, verify the relevant shopper journeys, diagnose a deliberate configuration error, and complete the production-readiness checks. Any undocumented explanation needed is a documentation gap.

This exercise and physical-device coverage remain separate from automated document rendering and source verification. Do not mark the goals fully accepted solely because link validation passes.

## Acceptance after the fresh review

The initial draft did not pass the agreed exercise. The review found prerequisite gaps, incorrect input/event facts, and unsafe lifecycle examples. Local corrections and focused regression evidence are recorded in `review-response.md`; all 12 goals remain subject to acceptance of the corrected draft. Approval of the goals and structure is unchanged.

## Navigation

### Get started

- `introduction`
- `start/prerequisites`
- `start/quickstart`

### Integration guides

- `integration/products`
- `integration/product-changes`
- `integration/react`
- `integration/appearance`
- `integration/analytics`
- `integration/direct-embed`

### Test and launch

- `testing/journey`
- `testing/security`
- `testing/launch`

### Troubleshooting

- `troubleshooting/symptoms`
- `troubleshooting/support`

### Technical reference

- `reference/configuration`
- `reference/javascript`
- `reference/events`
- `reference/errors`
- `reference/compatibility`
- `reference/protocol`

### Maintenance

- `maintenance/releases`
- `maintenance/updates`


## Page ownership

Guides own procedures and expected results. Reference pages own exact inputs, outputs, identifiers, and constraints. The quickstart is complete after prerequisites, with one recommended image-based loader path. Catalogue and direct embedding explain their distinct prerequisites. Troubleshooting is indexed by symptoms, then linked to exact error definitions.

## Publication boundary

Local content and preview are authorised. Publication, deployment-triggering pushes, and merge remain pending explicit founder approval after review of these changes.
