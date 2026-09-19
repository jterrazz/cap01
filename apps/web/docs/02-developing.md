# Developing

Use Node 24 and npm with the monorepo root lockfile. Run root commands from the
repository root; they reach this app through Turborepo, and `--filter=@cap01/web`
narrows one to it.

```sh
npm ci
npm run dev
make fix
make check
```

Development listens on 4320. The quality gate runs lint, production build and
tests. `@jterrazz/typescript` owns type checking, formatting, lint, unused code and
the tree gates, on the `react` profile named by `oxlint.config.ts` and
`tsconfig.json`; React Router generates route types before checks.

Change visual tokens in `src/app/globals.css`, views in `src/presentation` and
state transformations in `src/domain`. Keep routes thin and credentials absent.
