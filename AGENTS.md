# Repository Agent Instructions

## Repository purpose

This repository is an independent consumer application for the published `r3f-interactive-flow@2.11.0` package. Its purpose is to exercise the library as a real consumer, not to develop, mirror, or extend the library itself.

These instructions apply repository-wide to Codex, Claude Code, and any future coding agent.

## Consumer boundary

Treat the application and the library as separate projects. Application-specific behavior, presentation, navigation targets, and product decisions belong here. Library implementation details and library-owned lifecycle behavior do not.

## Published-package-only policy

Use only the pinned package published to the package registry. Do not replace it with a workspace link, local checkout, Git dependency, tarball, vendored source, or copied implementation. Do not patch, reproduce, or create a second instance of the library runtime in this repository.

## Package-root imports only

Import only documented public APIs from the `r3f-interactive-flow` package root. Do not use private subpaths, source files, internal runtime state, undocumented fields, or inferred implementation details. The upstream library documentation is authoritative for the public consumer surface.

## Architecture ownership

Preserve the repository's established ownership boundaries. Application layers own application behavior; the package owns its runtime and lifecycle. Before changing behavior, inspect the live repository and its architecture documentation to identify the responsible layer. Do not shift responsibilities between layers merely to bypass a public API constraint.

## Branch workflow

Work on a dedicated branch for one Issue. Keep commits limited to that Issue, use the requested commit message when one is specified, and open exactly one focused Pull Request that updates the current Issue. Do not merge the Pull Request. Stop when the requested work and reporting are complete.

## Validation policy

Run the checks required by the Issue and all relevant checks available in the repository. Inspect the final diff, verify the changed-file list, and report commands exactly as run. Distinguish checks that passed from checks that were skipped, unavailable, or failed; never claim an unexecuted check passed.

## Scope control

Make the smallest change that fully satisfies the current Issue. Do not perform opportunistic refactors, dependency changes, formatting sweeps, or unrelated documentation edits. Do not alter generated, deployment, CI, or dependency files unless the Issue explicitly requires it.

## Public GitHub language policy

Write public GitHub content in English, including branch names, commit messages, Issue comments, Pull Request titles, and Pull Request descriptions, unless the Issue explicitly requires another language. Keep public text factual, concise, and specific to the repository.

## No AI session URLs

Do not include AI conversation, transcript, session, share, or internal tool URLs in commits, Issues, Pull Requests, comments, source files, or documentation.

## Library defect reporting policy

First determine whether a problem belongs to this application or to the published library. Application-specific problems remain in this repository. Report a suspected library defect upstream only when it is reproducible against the pinned published package through documented package-root APIs and independently of this application's code. Provide a minimal consumer reproduction, expected and actual behavior, environment details, affected public APIs, and evidence that the problem reproduces outside this repository. Do not propose access to private internals as a fix.
