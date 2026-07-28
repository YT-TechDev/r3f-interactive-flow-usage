# Claude Code Instructions

Claude Code must read and follow [`AGENTS.md`](AGENTS.md) before beginning work. That file is the repository-wide contract; this file adds only Claude Code-specific operating guidance.

- Inspect the live repository, applicable instructions, current branch, and relevant documentation before making changes.
- Stay inside the current Issue's scope and prefer a small, focused Pull Request.
- Keep DOM input outside `Canvas`.
- Keep React Three Fiber hooks inside `Canvas`-bound components.
- Avoid React state for values updated on every frame; use render-loop-appropriate mutable values.
- Use only documented imports from the `r3f-interactive-flow` package root.
- Do not duplicate the package runtime.
- Do not introduce workaround timers for package-owned transitions, cooldowns, or lifecycle behavior.
- Stop after opening the Pull Request; do not merge it or begin unrelated follow-up work.
