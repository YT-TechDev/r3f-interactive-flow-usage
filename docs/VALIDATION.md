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

For the phase model and `FlowProvider` integration (Issue #7):

- `pnpm install --frozen-lockfile` completed successfully against the committed lockfile.
- `pnpm list r3f-interactive-flow --depth 0` confirmed the resolved direct dependency is exactly `r3f-interactive-flow@2.11.0`.
- `pnpm lint` (`eslint .`) completed with no reported violations.
- `pnpm typecheck` (`tsc -b`, independent of `vite build`) completed with no errors.
- `pnpm build` produced a clean Vite production build.
- `git diff --check` reported no whitespace errors.
- `pnpm dev --host 127.0.0.1` started the Vite dev server; HTTP requests to the served page and its transformed `src/main.tsx`, `src/app/App.tsx`, and `src/flow/FlowRoot.tsx` modules confirmed `App` is mounted under `FlowRoot`, `FlowRoot` imports `FlowProvider` from the `r3f-interactive-flow` package root, `PHASES` is passed as the provider's phase list, `initialPhase` is `"origin"`, and the module-scope `transition` object (`duration: 900`, `cooldown: 250`, `easing: easeInOutCubic`) is passed to the `transition` prop. The literal strings `Phase Field` and `Predictable flow for interactive 3D.` remain present in the served source. The dev server was then stopped cleanly.

Not performed: actual in-browser visual/runtime execution (no browser was opened; verification was limited to HTTP responses and served/transformed source content). Whether `FlowProvider` mounts and renders without a runtime or console error was not visually confirmed in a browser and remains planned validation, not executed evidence.

For the DOM flow controls and live inspector (Issue #9):

- `pnpm install --frozen-lockfile` completed successfully against the committed lockfile.
- `pnpm list r3f-interactive-flow --depth 0` confirmed the resolved direct dependency is exactly `r3f-interactive-flow@2.11.0`.
- `pnpm lint` (`eslint .`) completed with no reported violations.
- `pnpm typecheck` (`tsc -b`, independent of `vite build`) completed with no errors.
- `pnpm build` produced a clean Vite production build.
- `git diff --check` reported no whitespace errors.
- `pnpm dev --host 127.0.0.1` started the Vite dev server. The repository owner performed actual interactive browser validation at `http://127.0.0.1:5173/` and confirmed every observation in the Issue #9 checklist:
  - initial state: `phase: origin`, phase position `1 of 5`, `direction: none`, `isTransitioning`/`isCoolingDown`/`isLocked` all `false`, Previous and the current `origin` target disabled, Next enabled;
  - clicking Next: the accepted target became `expand` immediately, `direction` became `next` during the transition, progress visibly advanced, navigation controls were disabled while transitioning;
  - completion and provider cooldown: `isTransitioning` returned to `false` and `direction` returned to `none` at completion, `isCoolingDown` became briefly `true`, navigation stayed disabled during cooldown and became available after cooldown expired;
  - direct navigation: from a ready non-final phase, selecting `resolve` produced one direct transition to `resolve`, and Next became disabled at the final boundary;
  - reverse navigation: after readiness, Previous moved the target from `resolve` to `focus` with `direction: prev` during the transition;
  - manual lock: Lock set `isLocked` to `true` and disabled all navigation controls while remaining independently operable; Unlock set `isLocked` back to `false` and restored application-owned availability;
  - browser quality: no relevant runtime or console errors were observed, keyboard focus was visibly distinguishable on all buttons, and the inspector remained readable while progress updated.
  The dev server was then stopped cleanly.

Not performed: automated/headless browser interaction (the implementing agent had no direct browser-automation tool available in this session; all interactive observations above were performed and confirmed by the repository owner). Responsive-layout and full accessibility audits remain planned validation, not executed evidence for this Issue.

For the Phase Field visual direction and responsive DOM shell (Issue #11):

- `pnpm install --frozen-lockfile` completed successfully against the committed lockfile.
- `pnpm list r3f-interactive-flow --depth 0` confirmed the resolved direct dependency is exactly `r3f-interactive-flow@2.11.0`.
- `pnpm lint` (`eslint .`) completed with no reported violations.
- `pnpm typecheck` (`tsc -b`, independent of `vite build`) completed with no errors.
- `pnpm build` produced a clean Vite production build.
- `git diff --check` reported no whitespace errors.
- `pnpm dev --host 127.0.0.1` started the Vite dev server at `http://127.0.0.1:5173/`. The implementing agent had no browser-automation tool available in this session, so all interactive and responsive observations below were performed and confirmed by the repository owner rather than by the agent.

Owner-confirmed browser visual and responsive validation:

- 1440 × 900: no horizontal overflow; the runtime workspace remained a readable two-column composition; header links, phase names, status text, inspector values, and footer did not clip.
- 768 × 1024: no horizontal overflow; the workspace recomposed cleanly for the available width; controls, phase rail, inspector, and header links remained readable and operable.
- 320 × 568: no horizontal overflow; the workspace used one logical column; phase names and status text did not clip; buttons retained usable touch targets; the inspector and progress presentation remained readable.
- DOM and focus order: the semantic reading order was `header → hero → runtime sequence → controls → phase rail → inspector → footer`; keyboard focus stopped only on interactive elements (header links, enabled navigation/lock controls, enabled phase buttons); non-interactive hero, sequence, inspector, and footer content were not artificial tab stops; native disabled controls (current phase, unavailable boundary controls) were correctly skipped; visible focus treatment was confirmed on all focusable links and buttons.
- Reduced motion: with `prefers-reduced-motion` set to reduce, all lifecycle and lock information remained visible and understandable, no essential state depended on animation, and runtime controls continued to function.
- External links: GitHub (`https://github.com/YT-TechDev/r3f-interactive-flow`), npm (`https://www.npmjs.com/package/r3f-interactive-flow`), and documentation (`https://github.com/YT-TechDev/r3f-interactive-flow#readme`) links opened to the correct destinations.
- No relevant runtime or console errors were observed.

Owner-confirmed runtime regression validation (re-run from Issue #9):

- Ready lifecycle presentation in the initial state; the current phase, direction, and public state inspector values displayed correctly.
- Transition lifecycle presentation while navigation was active, with visible progress advancement and navigation gating.
- Provider cooldown: `isCoolingDown` became `true` after transition completion, navigation remained gated during cooldown, and Ready returned once cooldown ended.
- Direct navigation to `resolve`: one direct transition occurred, phase position became `5 / 5`, and Next and the current `resolve` target were disabled.
- Previous from `resolve` to `focus`: the accepted target became `focus` with `direction: prev` during the transition.
- Lock / Unlock: Lock set `isLocked` to `true`, navigation became unavailable, and manual lock received its own separate visible treatment; Unlock remained operable and restored application-owned availability.

The repository owner approved the final visual direction, including the runtime workspace hierarchy and lifecycle presentation.

Not performed by the agent: automated/headless browser interaction (no browser-automation tool was available in this session). All interactive, responsive, focus-order, reduced-motion, and external-link observations above were performed and confirmed by the repository owner, not the implementing agent. Cross-browser and full accessibility (for example, screen-reader) audits remain planned validation, not executed evidence for this Issue.

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
