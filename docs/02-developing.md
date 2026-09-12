# Developing

Use Node 24 and npm from the repository root; one root lockfile resolves all workspaces.

```sh
npm ci
npm run dev
make fix
make check
```

Root scripts currently delegate to `@cap01/web`. `npm run dev` starts port 4320;
`npm run build`, `npm run start`, `npm run lint` and `npm test` retain their usual
application meaning. To target the app explicitly, use `npm run <script> --workspace @cap01/web`.

Install application dependencies with `npm install <package> --workspace @cap01/web`.
Do not create nested lockfiles. Each app owns its tool configuration and corpus;
root documentation owns relationships and workspace commands.
