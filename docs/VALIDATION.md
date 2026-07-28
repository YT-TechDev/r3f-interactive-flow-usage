# Validation

This document separates the checks intended for the future application from checks that have actually been run. A planned check is not evidence of a passing implementation.

## Planned validation

Once application scaffolding and scripts exist, validate the following:

| Area | Planned check |
| --- | --- |
| Install | Install the lockfile-defined dependencies with pnpm from a clean workspace. |
| Dev server | Start the Vite development server and confirm the application loads without console or runtime errors. |
| Lint | Run the repository lint script and resolve reported violations. |
| Typecheck | Run the TypeScript typecheck independently of the production build. |
| Build | Produce a clean Vite production build. |
| Package version | Confirm the resolved `r3f-interactive-flow` package is exactly `2.11.0` and imports use only documented package-root exports. |
| Wheel input | Confirm one intentional wheel gesture requests the expected available target, while repeated input is gated appropriately. |
| Touch input | Confirm touch gestures work without accidental navigation and behave correctly across supported viewport sizes. |
| Keyboard input | Confirm documented navigation keys request the expected available target without interfering with standard browser and assistive-technology behavior. |
| Transition | Confirm navigation follows the visible transition lifecycle and does not rely on an application-owned transition timer. |
| Provider cooldown | Confirm new navigation is gated during the provider cooldown and becomes available when public provider state reports readiness. |
| Manual lock | Confirm application-owned locking disables input without being confused with transition or provider cooldown state. |
| Responsive layout | Inspect representative phone, tablet, laptop, and wide-screen viewports for usable Canvas and DOM UI layout. |
| Accessibility | Check keyboard operation, focus visibility and order, semantic controls, status announcements, motion preferences, contrast, and meaningful non-visual context. |
| Production deployment | Serve the production artifact in its intended hosting environment and verify asset paths, routing, loading, errors, and interaction behavior. |

Input checks must also cover unavailable targets because target availability is application logic. The common `isTransitioning || isCoolingDown || isLocked` gate does not describe every reason that a navigation request may fail.

## Executed validation

For this documentation-only change:

- Inspected the final Git diff.
- Confirmed that only `README.md`, `docs/ARCHITECTURE.md`, and `docs/VALIDATION.md` changed.

No application exists yet. Install, dev server, lint, typecheck, build, package resolution, interaction, layout, accessibility, and deployment checks were not run.

## Reporting a library defect

Before reporting a library defect, reduce it to the public package surface and determine whether it reproduces independently of Phase Field.

```md
### Package version
r3f-interactive-flow@2.11.0

### Minimal reproduction
<!-- Link to or provide the smallest consumer reproduction using documented package-root imports. -->

### Expected result
<!-- Describe the documented behavior that was expected. -->

### Actual result
<!-- Describe what happened, including relevant error output. -->

### Environment
<!-- Browser, operating system, device, Node.js, package manager, React, R3F, and Three.js versions. -->

### Affected public API
<!-- Name the documented package-root export(s) involved. -->

### Reproducibility outside this application
<!-- State whether and how the defect reproduces without Phase Field application code. -->
```
