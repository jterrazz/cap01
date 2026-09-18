# Operating

No product deployment is configured by this restructuring.

```sh
npm run build
PORT=4342 npm run start
```

The root delegates to the React Router server in `apps/web`; its build lives under
`apps/web/.artifacts/react-router`. The task cache sits at the root,
`.artifacts/turbo/cache`, which shared CI already restores between runs. The root npm
lockfile and Node 24 environment are the installation boundary.

Shared CI validates the repository through its root Makefile. The separate Astro
website has its own build and runtime. API, authentication, sync and mobile pairing
remain unimplemented; browser data is local and has no remote backup.
