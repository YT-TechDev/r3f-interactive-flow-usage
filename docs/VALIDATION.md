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

For the published-package consumer foundation (Issue #5):

- `pnpm install` completed successfully and resolved `r3f-interactive-flow@2.11.0` from the public npm registry (integrity-hash-backed entry in `pnpm-lock.yaml`, no workspace, local-path, Git, or tarball source).
- `pnpm list r3f-interactive-flow --depth 0` confirmed the direct dependency is exactly `2.11.0`.
- `pnpm peers check` reported no unmet peer dependencies.
- `pnpm lint` (`eslint .`) completed with no reported violations.
- `pnpm typecheck` (`tsc -b`, independent of `vite build`) completed with no errors.
- `pnpm build` produced a clean Vite production build.
- `git diff --check` reported no whitespace errors.
- `pnpm install --frozen-lockfile` completed successfully against the committed lockfile.
- `pnpm dev --host 127.0.0.1` started the Vite dev server; an HTTP request to the served page and its transformed `src/app/App.tsx` module confirmed the literal strings `Phase Field` and `Predictable flow for interactive 3D.` are present in the served source. The dev server was then stopped.

Not performed: actual in-browser visual inspection (no browser was opened; verification was limited to HTTP responses and served source content), interaction, responsive-layout, accessibility, and production-deployment checks. These remain planned validation, not executed evidence.

### Toolchain note: `pnpm-workspace.yaml`

`pnpm-workspace.yaml` was added outside the Issue's listed file scope. It is required because pnpm's supply-chain `minimumReleaseAge` policy otherwise refuses to install `r3f-interactive-flow@2.11.0`, which was published shortly before this work. The file excludes only that one package/version from the policy; it does not disable the policy generally. This deviation was confirmed with the repository owner before proceeding.

## Reporting a library defect

Before reporting a library defect, reduce it to the public package surface and determine whether it reproduces independently of Phase Field.

Application-specific problems belong in this repository. An application-specific problem does not automatically justify a change to the library.

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
