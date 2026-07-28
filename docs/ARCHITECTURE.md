# Architecture

## Purpose

Phase Field is an independent consumer of `r3f-interactive-flow@2.11.0`. The application integrates the published package through its documented public API; it does not reproduce or extend the library's runtime internals.

## Ownership boundaries

### Flow

The flow layer owns integration with the library's public provider and hooks, translates application navigation intent into navigation requests, and exposes public flow status where application behavior needs it.

- Do not duplicate the library runtime.
- Do not create a second flow runtime.
- Do not introduce independent transition timers.
- Do not access private runtime state.
- Do not use private imports. Only documented package-root imports are allowed.

Provider cooldown and hook-local input cooldown are different concepts. Provider cooldown is part of the shared flow lifecycle after a transition; hook-local input cooldown limits repeated input handled by a particular hook. Application code must not treat one as a substitute for the other.

### Input

The input layer owns DOM event registration and converts wheel, touch, and keyboard gestures into navigation intent. DOM input stays outside Canvas components. It requests navigation through the flow boundary rather than implementing transition timing itself.

Input gating may combine public flow state with an application-owned manual lock:

```ts
const disabled =
  isTransitioning ||
  isCoolingDown ||
  isLocked;
```

This condition is an input gate, not a guarantee that navigation will succeed and not an exhaustive model of every navigation failure. In particular, target availability is application logic: the application determines whether a requested destination exists and is currently available.

### Scene

The scene layer owns React Three Fiber Canvas content, Three.js objects, camera behavior, and render-loop animation. React Three Fiber hooks are only used inside Canvas. Per-frame values must not use React state; use refs or other render-loop-appropriate mutable values to avoid scheduling a React render every frame.

The scene consumes flow outcomes and application state but does not own DOM input or create a competing navigation lifecycle.

### UI

The UI layer owns DOM presentation, navigation controls, status communication, responsive layout, and accessibility. It can display public flow status and application-owned target or lock state, but it does not inspect private library state or reproduce flow behavior.

## Dependency boundary

All library usage must remain within the documented public consumer surface of `r3f-interactive-flow@2.11.0`:

- Import only documented APIs from the package root.
- Do not import package subpaths or implementation files.
- Do not copy library source into the application.
- Treat undocumented types, fields, and runtime objects as private.
- Keep target availability and product-specific navigation rules in the application.

The upstream [library documentation](https://github.com/YT-TechDev/r3f-interactive-flow#readme) is authoritative for its public API.
