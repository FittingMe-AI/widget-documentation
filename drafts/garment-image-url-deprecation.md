# Deprecated one-photo garment attribute — unpublished notice

Status: local draft, 2026-09-29. Do not publish until the plural loader, widget and API are available together in the target environment and the founder approves this documentation change.

`data-garment-image-urls` is the canonical loader attribute for one URL or an ordered JSON array of URLs showing views of the same product and colour. The existing `data-garment-image-url` remains supported as a deprecated one-photo alias. It does not accept the plural JSON-array syntax.

**1 December 2026 is a migration target, not a hard cutoff.** There is no date check or scheduled automatic removal. The singular alias continues to work after that date until a separate removal decision is instructed and enforced.

To migrate, replace the singular attribute with the plural attribute. For one photo, use a plain HTTPS URL or a one-element JSON array. For several views, use a JSON array of URLs in preference order, with a usable front view first. Keep every view on the same exact product and colour. Verify the complete Try-On journey in an environment that supports the v5 plural contract.

If both attributes appear, the loader reports a developer error and uses only the plural value, including when that value is empty or invalid. It never combines the values or recovers the singular value. Eligible catalogue imagery takes priority over supplied URLs and remains available if supplied configuration is unusable.

Future removal, only after a separate explicit instruction, would make a singular-only configuration a developer error and fall back to eligible catalogue imagery. This notice does not authorize that removal or documentation publication.

Companion unpublished pages: `reference/configuration.mdx`, `reference/compatibility.mdx`, `integration/products.mdx`, `start/quickstart.mdx`, `start/prerequisites.mdx`, `integration/appearance.mdx`, `troubleshooting/symptoms.mdx`, and `maintenance/releases.mdx`, with mirrored French routes.
