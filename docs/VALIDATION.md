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

For the Canvas and scene foundation (Issue #13):

- `pnpm install --frozen-lockfile` completed successfully against the committed lockfile.
- `pnpm list r3f-interactive-flow --depth 0` confirmed the resolved direct dependency is exactly `r3f-interactive-flow@2.11.0`.
- `pnpm lint` (`eslint .`) completed with no reported violations.
- `pnpm typecheck` (`tsc -b`, independent of `vite build`) completed with no errors.
- `pnpm build` produced a clean Vite production build.
- `git diff --check` reported no whitespace errors.
- `pnpm dev --host 127.0.0.1` started the Vite dev server at `http://127.0.0.1:5173/`. The implementing agent had no browser-automation tool available in this session, so all interactive, responsive, and visual observations below were performed and confirmed by the repository owner rather than by the agent.

Owner-confirmed browser visual validation:

- A real WebGL Canvas renders successfully and is not blank.
- The Flow Core is centered and fully visible.
- The static icosahedron and restrained outer ring establish a clear 3D scene foundation without implying phase-driven behavior.
- The mint core and graphite secondary structure integrate with the existing Phase Field visual language.
- The Canvas remains a bounded scene region and does not dominate the runtime surface.
- The desktop primary column is ordered as scene stage followed by flow controls, with the inspector remaining in the secondary column.
- The scene heading and description accurately describe the current static foundation.
- No fake Canvas, external asset, particle system, shader, camera control, or phase-driven geometry is present.

Owner-confirmed responsive and stability validation:

- 1440 × 900: pass, no horizontal overflow.
- 768 × 1024: pass, no horizontal overflow.
- 320 × 568: pass, no horizontal overflow.
- The narrow layout stacks scene, controls, phase rail, and inspector logically.
- Resizing preserved the Flow Core framing without clipping.
- Refreshing the page remounted the Canvas successfully.
- No relevant React, R3F, Three.js, WebGL, or browser-console errors were observed.

Owner-confirmed runtime regression validation (re-run with the Canvas mounted):

- Next from `origin` to `expand` remained functional.
- Transition gating and provider cooldown remained functional.
- Direct navigation to `resolve` remained functional.
- Previous from `resolve` to `focus` remained functional.
- Lock and Unlock remained functional.
- The static scene correctly remained unchanged during all flow interactions.

The repository owner approved the static Canvas and scene visual direction. The dev server was then stopped cleanly.

Not performed by the agent: automated/headless browser interaction (no browser-automation tool was available in this session). All visual, responsive, and runtime-regression observations above were performed and confirmed by the repository owner, not the implementing agent. Cross-browser and full accessibility (for example, screen-reader) audits remain planned validation, not executed evidence for this Issue.

For driving the Flow Core through phases (Issue #15):

- `pnpm install --frozen-lockfile` completed successfully against the committed lockfile.
- `pnpm list r3f-interactive-flow --depth 0` confirmed the resolved direct dependency is exactly `r3f-interactive-flow@2.11.0`.
- `pnpm list @react-three/fiber three --depth 0` confirmed `@react-three/fiber@9.6.1` and `three@0.185.1`.
- `pnpm lint` (`eslint .`) completed with no reported violations.
- `pnpm typecheck` (`tsc -b`, independent of `vite build`) completed with no errors.
- `pnpm build` produced a clean Vite production build (the only reported warning was Vite's generic bundle-size notice, unrelated to this change).
- `git diff --check` reported no whitespace errors.
- `pnpm dev --host 127.0.0.1` started the Vite dev server at `http://127.0.0.1:5173/`. The implementing agent had no browser-automation tool available in this session, so the agent presented the repository owner with an explicit checklist (initial `origin` state and first-frame stability; `origin → expand → align → focus → resolve` navigation with visually distinct settled states; direct non-adjacent navigation from `origin` to `resolve` as one continuous morph; reverse navigation from `resolve` to `focus`; geometry remaining static under manual lock; responsive behavior and refresh at 1440 × 900, 768 × 1024, and 320 × 568; and absence of console errors) and asked the owner to inspect it directly. The dev server was then stopped cleanly.

Owner-confirmed browser visual and transition validation:

- The repository owner reviewed the presented checklist in a browser and gave a single blanket confirmation ("all good") covering every item on it, rather than a line-by-line itemized response. No corrections or focused follow-up issues were requested for the five phase visual states or the transition behavior.

Not performed by the agent: automated/headless browser interaction (no browser-automation tool was available in this session); a line-by-line itemized transcript of each checklist item (the owner's confirmation was a single blanket approval of the full checklist, not itemized per-item evidence). Cross-browser and full accessibility audits remain planned validation, not executed evidence for this Issue.

### Toolchain note: camera distance adjustment (Issue #15)

`SceneStage.tsx`'s `Canvas` camera `position` changed from `[0, 0, 5]` to `[0, 0, 6]`; `fov` (42), `near` (0.1), and `far` (100) are unchanged. The `resolve` phase's core scale (1.2×) is the widest settled core, and the `focus`/`resolve` phase nodes sit close to the core's outer surface; at the original camera distance those elements approached the vertical edge of the view frustum. Increasing the camera distance by one unit restored comfortable clearance for all five settled phases without changing `fov` or adding camera animation or controls.

### Toolchain note: `pnpm-workspace.yaml`

`pnpm-workspace.yaml` was added outside the Issue's listed file scope. It is required because pnpm's supply-chain `minimumReleaseAge` policy otherwise refuses to install `r3f-interactive-flow@2.11.0`, which was published shortly before this work. The file excludes only that one package/version from the policy; it does not disable the policy generally. This deviation was confirmed with the repository owner before proceeding.

For the flow input layer (Issue #17):

- `pnpm install --frozen-lockfile` completed successfully against the committed lockfile.
- `pnpm list r3f-interactive-flow --depth 0` confirmed the resolved direct dependency is exactly `r3f-interactive-flow@2.11.0`.
- `pnpm list @react-three/fiber three --depth 0` confirmed `@react-three/fiber@9.6.1` and `three@0.185.1`.
- `pnpm lint` (`eslint .`) completed with no reported violations.
- `pnpm typecheck` (`tsc -b`, independent of `vite build`) completed with no errors.
- `pnpm build` produced a clean Vite production build (the only reported warning was Vite's generic bundle-size notice, unrelated to this change).
- `git diff --check` reported no whitespace errors.
- `pnpm dev --host 127.0.0.1` started the Vite dev server at `http://127.0.0.1:5173/`. The implementing agent had no browser-automation tool available in this session, so before any interactive claim, the served page and the transformed `src/app/App.tsx`, `src/input/FlowInputLayer.tsx`, and `src/ui/InputPanel.tsx` modules were fetched over HTTP and confirmed to contain the expected wiring: `App.tsx` renders `FlowInputLayer` wrapping `SceneStage` followed by `InputPanel` and `FlowControls`; `FlowInputLayer.tsx` calls `useWheelInput`, `useTouchInput`, and `useKeyboardInput` from the package root with `threshold: 40` / `threshold: 50` and `preventDefault: true`; `InputPanel.tsx` renders the `Wheel`, `Touch`, `Keyboard`, and `Gate` labels. This confirms served source content only, not interactive behavior.
- The agent then presented the repository owner with the full Issue #17 browser-validation checklist (wheel/trackpad behavior at the scene surface and its boundaries, touch swipe behavior and multi-touch rejection, keyboard `ArrowRight`/`ArrowLeft` navigation and typing/focus protection, input-panel binding text and gate/availability reporting, and runtime/scene regression) and asked the owner to inspect it directly in a browser.

Owner-confirmed browser validation:

- The repository owner reviewed the presented Issue #17 checklist in a browser and gave a single blanket confirmation ("all good") covering every item on it, rather than a line-by-line itemized response. No corrections or focused follow-up issues were requested for wheel, touch, keyboard, input-panel, or runtime-regression behavior.

Not performed by the agent: automated/headless browser interaction (no browser-automation tool was available in this session); a line-by-line itemized transcript of each checklist item (the owner's confirmation was a single blanket approval of the full checklist, not itemized per-item evidence); physical-device identification for the wheel/trackpad and touch checks (the owner's blanket approval did not specify physical mouse, physical trackpad, physical touch, or emulation, so no environment-specific claim is made here). Cross-browser and full accessibility audits remain planned validation, not executed evidence for this Issue.

For lifecycle-specific material treatment (Issue #19):

- `pnpm install --frozen-lockfile` completed successfully against the committed lockfile.
- `pnpm list r3f-interactive-flow --depth 0` confirmed the resolved direct dependency is exactly `r3f-interactive-flow@2.11.0`.
- `pnpm list @react-three/fiber three --depth 0` confirmed `@react-three/fiber@9.6.1` and `three@0.185.1`.
- `pnpm lint` (`eslint .`) completed with no reported violations.
- `pnpm typecheck` (`tsc -b`, independent of `vite build`) completed with no errors.
- `pnpm build` produced a clean Vite production build (the only reported warning was Vite's generic bundle-size notice, unrelated to this change).
- `git diff --check` reported no whitespace errors.
- `rg "setTimeout|setInterval|requestAnimationFrame|useFrame|useFlowProgress" src/scene` and `rg "useFlowFrame|useFlow" src/scene` confirmed only the pre-existing single `useFlowFrame()` consumer and one new `useFlow<Phase>()` call exist in `src/scene`, with no timer, `useFrame()`, or `useFlowProgress()` usage introduced.
- `git diff --name-only origin/main...HEAD` confirmed changes are limited to `docs/VALIDATION.md`, `src/scene/lifecycleVisuals.ts` (new), `src/scene/FlowCore.tsx`, and `src/scene/SceneStage.tsx`; `PHASE_VISUALS`, geometry transforms, camera, lighting, input configuration, `package.json`, and `pnpm-lock.yaml` are unchanged.
- `pnpm dev --host 127.0.0.1` started the Vite dev server at `http://127.0.0.1:5173/`. The implementing agent had no browser-automation tool available in this session, so before any interactive claim, the served page and the transformed `src/scene/FlowCore.tsx` module were fetched over HTTP and confirmed to contain the expected wiring: `useFlow` and `useFlowFrame` imported from the package root, a `lifecycle` value resolved with `Locked → Transition → Cooldown → Ready` priority, and the four `meshStandardMaterial` components bound to `materials.coreColor` / `materials.ringColor` / `materials.nodeColor`. This confirms served source content only, not interactive behavior. The dev server was then stopped cleanly.

Owner-confirmed browser validation (itemized, not a blanket approval):

- Ready uses the intended mint / graphite / neutral palette.
- Transition switches immediately to the cyan/mint palette after accepted navigation.
- The existing geometry morph continues correctly during Transition.
- Geometry reaches the exact target state before provider cooldown begins.
- Cooldown switches immediately to the restrained amber palette.
- Geometry remains fully static throughout provider cooldown.
- Locked uses the muted-red palette and overrides the other lifecycle colors.
- Lock and provider cooldown remain independent: Locked red overrides Cooldown amber; cooldown continues to expire while Locked; Unlock after cooldown expiry returns directly to Ready; Unlock before cooldown expiry returns to Cooldown until the actual expiry.
- No material fade, pulse, flashing, independent animation, geometry drift, or additional settling was observed.
- The lifecycle material states are visually clear and restrained; no focused color correction was requested.
- Supplied screenshots corroborated the Ready and Cooldown palettes and the mobile-emulation presentation.

Not performed or not confirmed: specific viewport dimensions (1440 × 900 / 768 × 1024 / 320 × 568) were not individually itemized by the owner for this Issue beyond the general mobile-emulation screenshot evidence noted above; wheel/touch/keyboard input-regression, DOM control, direct/reverse navigation, and phase-shape regression were not re-confirmed in this round; presence or absence of browser console errors was not stated; cross-browser and full accessibility (including reduced-motion-specific lifecycle legibility) audits remain planned validation, not executed evidence for this Issue.

For responsive and accessibility refinement (Issue #21):

- `pnpm install --frozen-lockfile` completed successfully against the committed lockfile.
- `pnpm list r3f-interactive-flow --depth 0` confirmed the resolved direct dependency is exactly `r3f-interactive-flow@2.11.0`.
- `pnpm list @react-three/fiber three --depth 0` confirmed `@react-three/fiber@9.6.1` and `three@0.185.1`.
- `pnpm lint` (`eslint .`) completed with no reported violations.
- `pnpm typecheck` (`tsc -b`, independent of `vite build`) completed with no errors.
- `pnpm build` produced a clean Vite production build (the only reported warning was Vite's generic bundle-size notice, unrelated to this change).
- `git diff --check` reported no whitespace errors.
- `rg "setTimeout|setInterval|requestAnimationFrame|useEffect|useState" src/app/App.tsx src/ui/SiteHeader.tsx src/ui/RuntimeSequence.tsx` reported no matches, confirming no timer, effect, or local React state was introduced in the changed DOM files.
- `rg "aria-live|role=\"status\"|sr-only|skip-link" src` confirmed exactly one lifecycle live-status region (`src/ui/RuntimeSequence.tsx`), one skip link (`src/app/App.tsx`), and the corresponding `.sr-only`/`.skip-link` CSS utilities (`src/styles/global.css`), with no duplicate live region elsewhere.
- `git diff --name-only origin/main...HEAD` confirmed changes are limited to `src/app/App.tsx`, `src/ui/SiteHeader.tsx`, `src/ui/RuntimeSequence.tsx`, `src/styles/global.css`, and this file; `src/flow/`, `src/input/`, `src/scene/`, `src/ui/FlowControls.tsx`, `src/ui/FlowInspector.tsx`, `src/ui/InputPanel.tsx`, `package.json`, and `pnpm-lock.yaml` are unchanged.
- `pnpm dev --host 127.0.0.1` started the Vite dev server (bound to `127.0.0.1:5174` because a separate process already held `5173`). The implementing agent had no browser-automation tool available in this session, so before any interactive claim, the served page and the transformed `src/app/App.tsx`, `src/ui/SiteHeader.tsx`, and `src/ui/RuntimeSequence.tsx` modules were fetched over HTTP and confirmed to contain the expected wiring: the skip link as the first child targeting `#main-content`, `<main id="main-content" tabIndex={-1}>`, `aria-label` values communicating new-tab behavior on the GitHub/npm/Docs links, and the single `role="status" aria-live="polite" aria-atomic="true"` element deriving `Flow status: {lifecycleStatus}.` from the `Locked → Transition → Cooldown → Ready` priority. This confirms served source content only, not interactive behavior.

Owner-confirmed browser validation (itemized):

- The skip link is the first visible keyboard-focus target and becomes clearly visible when focused.
- Activating the skip link targets `#main-content`.
- Keyboard focus treatment is clearly visible throughout.
- The external GitHub, npm, and Docs links retain their visible labels, destinations, and new-tab behavior, and their accessible names include the new-tab result.
- The inspected desktop, tablet, and mobile-emulation layouts showed no blocking horizontal overflow or unreadably compressed `InputPanel` content.
- Flow Core, inspector, runtime sequence, controls, phase rail, and input panel remain readable and operable in the inspected layouts.
- Previous, Next, direct phase navigation, Lock/Unlock, keyboard input, and Chrome touch emulation remain functionally correct.
- Transition, provider cooldown, Ready, and lifecycle material behavior remain correct.
- Touch navigation remains accepted at the expected threshold, and provider cooldown continues to gate repeated navigation correctly.
- No blocking runtime exception or broken application behavior was observed.

Accessibility evidence boundary: DOM/source and accessible-name semantics were inspected; audible screen-reader announcement behavior was not tested. This is not a screen-reader or WCAG certification claim.

Console observations (recorded honestly, not omitted):

- Chrome DevTools responsive touch emulation repeatedly emitted: `[Intervention] Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.` The intervention count increased during emulated swipe interaction. Despite the intervention, phase navigation, provider cooldown gating, and gesture behavior remained correct. This validation used Chrome DevTools touch emulation on desktop; physical touch-device behavior was not tested.
- A `THREE.Clock` deprecation warning was also observed. Scene and dependency files are unchanged in Issue #21, and this warning is not addressed in this scope. The input hook configuration, custom listeners, package code, and dependencies were not modified to suppress either warning.

The browser console was **not** clean; both warnings above were present and are recorded rather than suppressed or omitted.

Not performed or not confirmed: automated/headless browser interaction (no browser-automation tool was available in this session; all interactive observations above were performed and confirmed by the repository owner); audible screen-reader announcement testing; physical touch-device testing; cross-browser and full accessibility (for example, screen-reader or WCAG conformance) audits remain planned validation, not executed evidence for this Issue.

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
