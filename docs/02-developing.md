# Developing

Use Node 24 and npm from the repository root; one root lockfile resolves all workspaces.

```sh
npm ci
npm run dev
make fix
make check
```

Every root script is a `turbo run`, so `npm run build` builds whichever workspaces
carry a `build` script and reuses the result when nothing they read has changed.
`npm run dev` starts port 4320; `npm run build`, `npm run start`, `npm run lint` and
`npm test` retain their usual application meaning. `make check` is one run of the
three gate tasks, `turbo run lint build test`.

To target one application, filter it: `npm run build -- --filter=@cap01/web`. To make
a task run despite a cache hit, add `--force`.

`turbo.json` declares what each task needs and what it writes: `test` waits for
`build`, because the website specs serve the production bundle, and `lint` claims the
route types React Router generates. The cache is a directory like any other build
output, `.artifacts/turbo/cache`; deleting it costs a full run and nothing else.

A task also runs in a filtered environment — turbo passes it only the variables
`turbo.json` names. `PORT` reaches `start` because the task declares it; a script that
starts reading a variable needs the same line, or it silently sees nothing.

Install application dependencies with `npm install <package> --workspace @cap01/web`.
Do not create nested lockfiles. Each app owns its tool configuration and corpus;
root documentation owns relationships and workspace commands.
