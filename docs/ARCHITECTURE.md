# Architecture

## Purpose

Phase Field is an independent consumer of `r3f-interactive-flow@2.11.0`. The application integrates the published package through its documented public API; it does not reproduce or extend the library's runtime internals.

## Ownership boundaries

### Flow

The flow layer owns the application-owned phase tuple, `FlowProvider` configuration, transition duration, provider cooldown, easing, and flow-level composition. It translates application navigation intent into navigation requests and exposes public flow status where application behavior needs it.

- Do not duplicate the library runtime.
- Do not create a second flow runtime.
- Do not introduce independent transition timers.
- Do not access private runtime state.
- Do not use private imports. Only documented package-root imports are allowed.

Provider cooldown and hook-local input cooldown are different concepts. Provider cooldown is part of the shared flow lifecycle after a transition; hook-local input cooldown limits repeated input handled by a particular hook. Application code must not treat one as a substitute for the other.

### Input

The input layer owns wheel input, touch input, keyboard input, DOM listener configuration, input enable/disable behavior, and input acceptance feedback. It converts gestures into navigation intent and requests navigation through the flow boundary rather than implementing transition timing itself.

DOM input logic stays outside Canvas-bound scene components.

Input gating may combine public flow state with an application-owned manual lock:

```ts
const disabled =
  isTransitioning ||
  isCoolingDown ||
  isLocked;
```

This readiness expression is an input gate, not a guarantee that navigation will succeed. It does not cover phase boundaries, same-phase `goTo()`, unknown targets, or every navigation rejection reason.

Target-specific availability remains application logic based on the application-owned phase tuple, the current phase, and the current phase index.

### Scene

The scene layer owns `Canvas`, Canvas-bound components, `useFlowFrame`, Three.js objects, frame-based interpolation, and scene-specific visual behavior. React Three Fiber hooks, including `useFlowFrame`, are used only inside Canvas-bound components. Values updated every frame must not use React state; use refs or other render-loop-appropriate mutable values to avoid scheduling a React render every frame.

The scene consumes flow outcomes and application state but does not own DOM input or create a competing navigation lifecycle.

### UI

The UI layer owns DOM controls, phase navigation, the state inspector, lock controls, input indicators, explanatory content, and external links. DOM UI uses `useFlow()` and `useFlowProgress()` to consume documented public flow state. It can display application-owned target or lock state, but it does not inspect private library state or reproduce flow behavior.

## Dependency boundary

All library usage must remain within the documented public consumer surface of `r3f-interactive-flow@2.11.0`:

- Import only documented APIs from the `r3f-interactive-flow` package root.
- Do not consume the library through workspace links, local paths, Git branches, or tarballs.
- Do not import private package subpaths or implementation files.
- Do not copy library source into the application.
- Treat undocumented types, fields, and runtime objects as private.
- Keep target availability and product-specific navigation rules in the application.

The upstream [library documentation](https://github.com/YT-TechDev/r3f-interactive-flow#readme) is authoritative for its public API.
