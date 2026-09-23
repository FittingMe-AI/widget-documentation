# FittingMe developer documentation

Public virtual try-on integration documentation, rewritten around the founder-approved developer goals and six-group structure. The 22 MDX pages guide in-house developers and external integrators from prerequisites through launch and maintenance.

- Navigation and site presentation: `docs.json`.
- Approved goals, acceptance exercise, and page responsibilities: `drafts/documentation-design.md`.
- Implementation evidence: `drafts/documentation-provenance.md`.
- Local checks and remaining acceptance limitations: `drafts/local-review.md`.

## Validate and preview

Use Node 24 from the workspace's configured runtime:

```sh
export PATH="$HOME/.local/opt/node/bin:$PATH"
node scripts/validate-docs.mjs
mint dev --port 3003 --no-open
```

The preview is available at `http://localhost:3003`. Mintlify's local search requires CLI login; page navigation and rendering work independently. Do not publish as part of previewing.

Keep exact API definitions in the reference pages, verify behaviour against owning source, and exercise changed runnable examples against functioning services. Preserve the source/operational distinction in the review record. No credentials belong in public files or verification reports.
