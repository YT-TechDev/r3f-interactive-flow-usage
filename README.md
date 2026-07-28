# Phase Field

Phase Field is an independent, real-world usage site for [`YT-TechDev/r3f-interactive-flow`](https://github.com/YT-TechDev/r3f-interactive-flow). It is intended to exercise the published npm package as a consumer; it does not build against or copy the library source.

> **Predictable flow for interactive 3D.**

## Consumer contract

This repository will consume the pinned package version:

```text
r3f-interactive-flow@2.11.0
```

Application code may import only documented public APIs from the package root. Private paths, internal runtime state, and copied library implementation are outside the consumer contract. Refer to the [library documentation](https://github.com/YT-TechDev/r3f-interactive-flow#readme) for the authoritative API and behavior rather than duplicating it here.

## Intended runtime sequence

```text
Input → navigation request → transition → provider cooldown → ready
```

## Planned stack

- Vite
- React
- TypeScript
- React Three Fiber
- Three.js
- pnpm

## Development commands

Install, development, lint, typecheck, and build commands are planned. No application scripts exist yet, so this document intentionally does not present runnable commands or claim that the application runs. The expected checks and the distinction between planned and executed work are recorded in [`docs/VALIDATION.md`](docs/VALIDATION.md).

## Architecture

Ownership boundaries and implementation constraints are defined in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
