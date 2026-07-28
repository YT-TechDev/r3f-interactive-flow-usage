# Claude Code Instructions

Read and follow [`AGENTS.md`](AGENTS.md) first. It is the shared repository contract; this file contains only Claude Code-specific execution guidance.

Before editing, read the target Issue and relevant repository documentation. Inspect the live working tree, current branch, repository structure, available scripts, and dependency state. Follow the Issue-defined file and behavior scope exactly, and prefer the smallest local implementation that satisfies the accepted contract.

- Use pnpm commands defined by the repository.
- Preserve DOM/Canvas boundaries and R3F hook boundaries.
- Avoid React state for per-frame values.
- Use only documented `r3f-interactive-flow` package-root imports.
- Avoid speculative abstractions and reusable effects systems.
- Do not add workaround timers or duplicate runtime behavior.
- Inspect the final diff and report exact validation evidence.
- Open or update one focused Pull Request, then stop without merging or starting unrelated follow-up work.
