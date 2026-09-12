# Developing

Use Node 24 and npm with the monorepo root lockfile. Run root commands from the
repository root, or target this app with `--workspace @cap01/web`.

```sh
npm ci
npm run dev
make fix
make check
```

Development listens on 4320. The quality gate runs lint, production build and
tests. `@jterrazz/typescript` owns formatting, lint and unused-code checks;
React Router generates route types before checks.

Change visual tokens in `src/app/globals.css`, views in `src/presentation` and
state transformations in `src/domain`. Keep routes thin and credentials absent.
