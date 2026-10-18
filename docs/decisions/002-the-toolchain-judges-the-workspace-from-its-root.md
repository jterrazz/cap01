# ADR-002: The toolchain judges the workspace from its root

**Status:** Accepted
**Date:** 2026-10-09
**Accepted:** 2026-10-15, on the owner's word: "a monorepo is the repository's shape, never a kind".
**Amends:** [ADR-001](001-turborepo-runs-the-workspace-tasks.md): `lint` and `lint:fix` leave the task graph, and the cache moves to `.artifacts/turbo/`

## Context

ADR-001 made every root task a `turbo run`, `lint` among them: each member ran
`react-router typegen && typescript check` on itself, and `make check` was one
`turbo run lint build test`. `@jterrazz/typescript` 11 judges a monorepo from its
root. The monorepo is the repository's shape, read from the root `package.json`'s
`workspaces`, never a kind: the root declares no kind and no platform, and each
member declares its own. One `typescript check` at the root runs every pass over
every member by the kind and platform that member declares, and a member keeps no
lint or format config of its own. A member that also checked itself would be
judged twice, under a config the root's would contradict.

## Decision

`lint` and `fix` leave the task graph and run at the root: `turbo run typegen`
first (the route types are still a member's task, cached by turbo), then
`typescript check` or `typescript fix` once. `build`, `test`, `dev` and `start`
stay turbo tasks, as ADR-001 decided. `make check` is the template's
`lint test mutation`. The turbo cache moves from `.artifacts/turbo/cache` to
`.artifacts/turbo/`, the folder the toolchain's artefact gate assigns turbo.

## Consequences

- One `typescript check` covers a second member the day it lands, with no root
  edit, the property ADR-001 bought turbo for.
- The root lint is no longer cached by turbo: it runs whole on every `make lint`.
- `make check` measures the mutation verdict, which ADR-001's graph did not run.
