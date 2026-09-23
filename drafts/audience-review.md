# Audience wording review — 2026-09-23

The founder clarified that these pages address the developer integrating FittingMe for a retailer. The developer may work in-house or as an external integrator; the retailer must not be described as the developer's client.

This wording-only correction starts from published merge `0ff3b23057d5245cb950d94dc80fe77ca7ee95ff` on local branch `codex/docs-audience-20260923`. The starting tree was clean (0 paths). Preview: http://localhost:3003/introduction.

## Changes

Fourteen public pages now address the reader directly through "you", "your storefront", "your team", and "the retailer". Access, privacy and release instructions name the relevant roles. The introduction explicitly includes in-house developers and external integrators. The README, design brief and repository writing guidance preserve that audience definition.

## Verification

- All 22 public pages were audited. No prose describes the retailer as the developer's client. Remaining technical uses are "client bundles" and React's `'use client'` directive.
- All 15 fenced code blocks across 22 pages are identical to the published base. `docs.json` is byte-identical; navigation and configuration are unchanged. No product rebuild or new shopper-journey run was needed for this wording correction.
- The validator passes: 22 pages, 90 internal links, 28 anchor references, 15 fences and three complete HTML examples, zero errors.
- All 14 changed pages rendered their exact expected title without horizontal document overflow at 1440×1000 and 375×844. The rendered audience-language check passed at both widths: 28 checks in total. The revised introduction was visually inspected on mobile.
- `git diff --check` passes. Browser evidence is under ignored `.review/audience-render.json`.

The local preview uses the existing Mintlify runtime; hosted fonts may use the network. Product dependencies and the previously documented functional limitations are unchanged. This correction has not been pushed or published. The previous redesign's publication approval applies to that release; this revision is ready for local review.

## Content fingerprints for this revision

| Page | Bytes | SHA-256 |
| --- | ---: | --- |
| `introduction` | 3739 | `b82a38263bc4f4679ca8d3d4969faabdaaf23794f385b2a26aecfbd183d95bab` |
| `start/prerequisites` | 6333 | `07f58f826af77a192ab053cff23690449c626b026f2291fbd2612bd2c3a2789d` |
| `start/quickstart` | 4869 | `0863ca3c500f80d9279e271b676e9dc5f5deb10c4db2cea40c4c676eabe1e542` |
| `integration/products` | 4273 | `a8b5eee6298ec58937232e28a2afa8fb59f5f4bb72396499e23b547261e9d3c0` |
| `integration/product-changes` | 4090 | `519c852d37d3a3e9fd468764ce7ca616081873ab76e9ed08e3d45f126043cfb7` |
| `integration/react` | 6369 | `4f21fcad299ceac23fa2fb80d8375c4c67fd5755f290d454207e9c895233b677` |
| `integration/appearance` | 5921 | `0f31c9055ec32646cb30e9c340371d68b2446f3ecddb16634f0148808808eb81` |
| `integration/analytics` | 4574 | `40d2c7169815f80b60a169a88761e07ceb0f2eed884c5b4012c2c2c8e9b32f44` |
| `integration/direct-embed` | 8797 | `c19d3fe8e8a38492f92a463ac1e901230368d07efef5ac679484b57f192600f5` |
| `testing/journey` | 4501 | `9c18b53380b5c192b2c42b92e57f9fdef392c36df299277c1f32483831ae9e44` |
| `testing/security` | 4167 | `e496065404e79b87305ad6b69e6929a2e0a9b9ac91fea05d94a81b4926f22af2` |
| `testing/launch` | 3887 | `a3639d18da2fa50dd6ad85132da45fb5bd358f421180a85dd162b41e5dfd1a39` |
| `troubleshooting/symptoms` | 7505 | `4c07bdcc3d343b1f8993c4dd8d0af5bae525c423061fc4c3bac316996b223a15` |
| `troubleshooting/support` | 2196 | `ff2fea7d71be822eb4f166f2ae27302f97dc1f6deed239abf7d1b45dc3b73a6b` |
| `reference/configuration` | 3455 | `afbe74898fa2e69ab697d0ac1323abb191edc83a3f42222efe6bcdd61a04e980` |
| `reference/javascript` | 5068 | `c1b0b2981807817379eab93f28c90b4beabfbefedb4ad803375bee6533e511e4` |
| `reference/events` | 4056 | `e1cdb5885c64a2a08a63fbf23200c1511c1847cc5153b43e1f6e9d8c61b333dd` |
| `reference/errors` | 5203 | `4547de5f75d9669c2de1b3660117c7d64590036439884ff98dabfe9f51f2f22f` |
| `reference/compatibility` | 3701 | `cbcb04d475b914cd7e11b909f560f5bff23ddf6e1488cafc0e070d91448aa5c7` |
| `reference/protocol` | 5017 | `94097de0d4ca98b7b33d48544975d65f5a0f6087b37ae3b269803e2a9643132c` |
| `maintenance/releases` | 2307 | `78dcb0ad72583e5c4beba70fdb4245ad561d1d2f1911deaf88facb2deb0c23ae` |
| `maintenance/updates` | 3364 | `d5db7c2afb4c252b62f652e0a48e23705a3ab5f7a0e0a1cd5528608b9cfde63d` |
