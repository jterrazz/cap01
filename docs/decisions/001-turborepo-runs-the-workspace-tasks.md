# ADR-001: Turborepo runs the workspace tasks

**Status:** Proposed
**Date:** 2026-09-18

## Context

The repository became an npm workspace with one member, `apps/web`, and the root
scripts were written as `npm run <x> --workspace @cap01/web`. Two things follow from
that spelling, and both get worse with the second application.

The root NAMES the app. `dev`, `build`, `start`, `lint`, `lint:fix` and `test` each
repeat `@cap01/web`, so the planned API and Expo native client — the approved split,
recorded on the brand's engineering seat — cannot be added without editing six root
scripts and inventing a convention for running two of them at once.

Nothing is reused. `make check` ran `lint`, then `build`, then `test` as three
sequential `make` targets, each paying process startup and each redoing its work on
an untouched tree: 4.9s for a repository with one app, six tests and a 2000-module
bundle, and every second of it spent again on the next run.

## Decision

Turborepo 2.11.1, pinned exactly, as the root's only devDependency, and `turbo.json`
at the root as the single declaration of the task graph. Every root script becomes
`turbo run <task>`, naming no application: turbo finds the script in whichever
workspace carries it. `make check` is `turbo run lint build test`, one run rather
than three targets, which also lets lint run alongside build.

The graph states what a task needs and what it writes. `build` depends on `^build`
and writes `.artifacts/react-router/**`; `test` depends on `build`, because the
website specs start the production server and serve that bundle; `lint` writes the
route types `react-router typegen` generates, `.react-router/types/**`; `dev` is
persistent and uncached, and `start` and `lint:fix` are uncached because they serve
and mutate rather than produce.

The cache is `.artifacts/turbo/cache`, not turbo's default `.turbo/cache`. The
artefact convention puts every tool's output under `.artifacts/<tool>/`, and the
shared validate workflow already caches the root `.artifacts` directory between runs
keyed on the lockfile — so CI gains the task cache with no change to the workflow
file. An explicit relative `cacheDir` has a second effect turbo documents: it stops a
worktree from sharing the main checkout's cache, which would otherwise restore
outputs holding another checkout's absolute paths.

`devEngines.packageManager` declares npm. Turbo needs to know the package manager to
read the lockfile, and this is the form that replaces the top-level `packageManager`
field turbo deprecates. The version is the major, `12.x`, taken from `npm --version`
on the workstation — the lockfile header records no npm version — rather than the
exact `12.0.2`: CI floats the Node 24 minor, its bundled npm moves with it, and npm
fails an install on a devEngines mismatch.

## Consequences

- `make check` on an unchanged tree costs 0.2s instead of 4.9s, and 3.8s to 4.6s when
  the cache is empty. The numbers are indicative — one shared workstation, one app.

| Run                          | Before | After       |
| ---------------------------- | ------ | ----------- |
| `make check`, empty cache    | 4.9s   | 3.8s – 4.6s |
| `make check`, nothing edited | 4.9s   | 0.2s        |

- A workspace added under `apps/` joins the graph by carrying the script; the root is
  not edited, which is the reason to pay for turbo before the second app exists.
- CI caches the task results without owning a line about turbo. Its `.artifacts` cache
  step was inert for this repository, which wrote nothing there; it now carries the
  build.
- One path turbo does not let us move: it writes task logs to `<app>/.turbo/`, and no
  flag, config key or environment variable relocates them. `.gitignore` names
  `apps/web/.turbo/`, anchored — the form the artefact gate accepts from a workspace
  root — so the ignore list grows one line per application. A lint run at the ROOT
  would read that same line as its own and fail the gate; the root has no lint today.
- A task no longer inherits the shell's environment: turbo filters it to what
  `turbo.json` names. `PORT` is declared on `start` because the operating chapter
  documents `PORT=4342 npm run start`, which otherwise served port 3000 without a
  word. Every future variable costs the same line, and a script that reads an
  undeclared one sees nothing rather than failing.
- `turbo run <task> --force` is the escape hatch when a cache hit is wrong. A wrong
  hit is a real failure mode: a task whose inputs are under-declared goes green
  without running.
