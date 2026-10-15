# Develop

Node 24 and npm, from the repository root: one lockfile resolves every member.

## The gestures

| Command      | Does                                                              |
| ------------ | ----------------------------------------------------------------- |
| `make build` | the production bundle of every member (`turbo run build`)         |
| `make lint`  | the route types, then `typescript check` over the whole workspace |
| `make fix`   | the route types, then `typescript fix`                            |
| `make test`  | every member's vitest suite, after its build (`turbo run test`)   |
| `make check` | `lint`, `test`, then the mutation verdict — everything CI runs    |
| `make dev`   | the development server on port 4320                               |

## The task graph

`turbo.json` declares each task once, and every root script is a `turbo run`
naming no member: a member joins the graph by carrying the script. `test` waits
for `build`, because the website specs serve the production bundle; `typegen`
writes the route types React Router generates under `.react-router/types`,
which the type check reads. Narrow a task with `--filter=@cap01/web`, and force
it past a cache hit with `--force`. The cache is `.artifacts/turbo/`.

A task sees only the variables `turbo.json` names: `PORT` reaches `start`
because the task declares it, and a script that starts reading another variable
needs the same line.

## The declaration

The root lists its members in `package.json`'s `workspaces` and declares no
kind, so it keeps no `jterrazz.config.ts`; `apps/web/jterrazz.config.ts` says
`website` on `react` and holds the app's exceptions, each with its reason —
the React Router route types its `tsconfig.json` reads, and the browser-only
modules mutation leaves out ([Test](test.md#mutation)). The files derived from
it are written by `make fix`, and a hand edit is refused: the root keeps
`oxlint.config.ts` and `oxfmt.config.ts`, one line each, read for the whole
workspace, and `apps/web` keeps its `tsconfig.json` and `vitest.config.ts`.

Install a dependency of the app with
`npm install <package> --workspace @cap01/web`; no member keeps a lockfile.

## Changing the app

Visual tokens are in `apps/web/src/app/globals.css`, views in
`apps/web/src/presentation/`, state transitions in `apps/web/src/domain/`.
Routes stay thin, and no credential lives in the tree.

## Running the production build

```sh
npm run build
PORT=4342 npm run start
```

The React Router server serves `apps/web/.artifacts/react-router/`. Clearing the
browser's storage removes every local entry: there is no remote backup.
