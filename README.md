# FittingMe integration documentation

Nineteen retailer-facing pages for virtual try-on, built with Mintlify. The
approved structure and scope are in [the design brief](drafts/documentation-design.md).

The site includes three complete HTML quickstarts, onboarding, catalogue handoff,
product changes, multiple embeds, React/Next.js, shared contract references,
tracking recipes, troubleshooting and browser release checks. `docs.json` owns
navigation. The existing logo, fonts, palette and `style.css` remain the brand
foundation.

## Local preview and checks

Use the workspace's Node 24 installation:

```sh
export PATH="$HOME/.local/opt/node/bin:$PATH"
node scripts/validate-docs.mjs
mint dev --no-open --telemetry false
```

The CLI prints its available local port. Preview assets/fonts can require network
access. Search in the local preview requires Mintlify CLI authentication; page
navigation and content rendering do not.

The validator checks the 19-route navigation, metadata, local links, fenced code,
complete HTML example syntax and retired/unfinished vocabulary. Browser checks
must additionally verify actual rendering and the examples against functioning
services. See the unpublished [provenance record](drafts/documentation-provenance.md)
for source revisions and [local review record](drafts/local-review.md) for measured
coverage, URLs and dependencies.

`drafts/`, `.review/` and `scripts/` are excluded from the Mintlify site. `.review/`
is also Git-ignored: it contains pinned source snapshots, generated local assets
and verification evidence. Published examples contain placeholders only.

## Publication

This work remains local for founder review. Do not push, merge or deploy until
the founder explicitly approves publication after that review. A push to this
repository's default branch may publish the site.
