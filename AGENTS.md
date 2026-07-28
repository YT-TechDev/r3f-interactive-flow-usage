# Repository Agent Instructions

## Authority and purpose

This is the repository-wide contract for Codex, Claude Code, and future coding agents.

This repository is the independent real-world usage site for `YT-TechDev/r3f-interactive-flow`. It must provide a polished public consumer experience and serve as a dogfooding surface that produces evidence for library maintenance. It is not the library implementation repository. Do not duplicate, replace, modify, or recreate the library runtime here.

## Consumer boundary

Consume only the published npm package, initially pinned to `r3f-interactive-flow@2.11.0`. Import only documented public APIs from the `r3f-interactive-flow` package root.

Do not use workspace links, local paths, Git branches, tarballs, vendored source, copied implementation, private package subpaths, undocumented fields, or private runtime state. Never upgrade the library automatically. Handle every package upgrade as an explicit consumer-validation change with its own scope and evidence.

## Technical baseline

The intended technical baseline is pnpm, Vite, React, TypeScript, React Three Fiber, and Three.js. Do not add a runtime dependency merely for convenience.

Without explicit owner approval, do not introduce:

- Next.js;
- GSAP;
- Framer Motion;
- a state-management library;
- a UI framework;
- a documentation framework; or
- another animation runtime.

## Architecture boundaries

[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) is the detailed authority. Preserve these ownership boundaries:

### `flow`

The `flow` layer owns the application-owned phase tuple, `FlowProvider` configuration, transition duration, provider cooldown, easing, and flow-level composition.

### `input`

The `input` layer owns wheel, touch, and keyboard input; DOM listener configuration; input enable/disable behavior; and input feedback. DOM input logic must remain outside Canvas-bound scene components.

### `scene`

The `scene` layer owns `Canvas`, Canvas-bound components, `useFlowFrame`, Three.js objects, frame-based interpolation, and scene-specific visual behavior. Use R3F hooks only inside Canvas-bound components. Do not use React state for values updated every frame.

### `ui`

The `ui` layer owns DOM controls, phase navigation, the state inspector, lock controls, input indicators, explanatory content, and external links. DOM UI should consume documented public state through `useFlow()` and `useFlowProgress()`.

## Runtime semantics

Provider cooldown and hook-local input cooldown are separate concepts. Target-specific availability remains application logic. Do not create independent transition timers, duplicate cooldown logic, access private runtime state, or create a second flow runtime.

The common input-readiness expression is:

```ts
const disabled =
  isTransitioning ||
  isCoolingDown ||
  isLocked;
```

This expression is only an input gate. It does not cover phase boundaries, same-phase `goTo()`, unknown targets, or every navigation rejection reason. Do not claim broader runtime guarantees.

## Scope control and planning

Before planning or editing:

1. Inspect the live repository, working tree, current branch, repository structure, relevant documentation, available scripts, and dependency state.
2. State the exact goal, intended files, maximum scope, out-of-scope items, and intended validation commands.
3. Work on a dedicated branch; never implement directly on `main`.

Prefer focused, Pull Request-sized changes. Avoid unrelated file changes and do not add abstractions before a repeated local need exists. Use a requested commit message when one is specified.

Stop and report before proceeding if the work would materially change any unapproved scope, architecture, dependencies, deployment, public behavior, or library integration strategy.

## Validation and reporting

Follow [`docs/VALIDATION.md`](docs/VALIDATION.md) and the target Issue. A command may be reported as passing only when that exact command was executed successfully. Report failures, warnings, skipped checks, environment limitations, and unverified assumptions honestly. Inspect the full final diff and verify the changed-file list before completion. Never present planned or inferred validation as executed evidence.

## GitHub workflow and public language

Write Issues, Pull Requests, comments, commit messages, and repository documentation in English. Public content must be factual, concise, and repository-relevant.

Do not include ChatGPT, Codex, Claude, or other AI conversation, task, transcript, session, share, or internal tool URLs in public GitHub records.

Open or update exactly one focused Pull Request for the current Issue. Do not merge unless the owner explicitly requests review and merge, and do not merge until required validation passes. Stop after the requested work and reporting are complete.

## Library defect policy

Application-specific problems belong in this repository. Before reporting a suspected library defect, establish all of the following:

- the exact published package version;
- a minimal reproduction using documented package-root imports;
- expected and actual results;
- relevant environment details;
- the affected documented public APIs; and
- whether the problem reproduces outside this application.

Do not use duplicated timers, internal imports, private state access, or a second runtime to hide a possible library defect. A request for a new library API requires concrete evidence from an ordinary consumer problem. Convenience, symmetry, aesthetic completeness, or roadmap momentum alone is not sufficient justification.
