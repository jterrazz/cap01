# Architecture

`cap01` is the product monorepo, using npm workspaces without an orchestration layer.

`apps/web` is the sole implemented workspace: a React Router framework-mode
application with Vite, React and local browser storage. Its code and interface
contracts live in the [web corpus](../apps/web/docs/README.md).

A product API and Expo native client are planned boundaries. No API implementation,
mobile scaffold or shared package has been invented. Add a workspace only when
there is real code and a contract to own. Client code currently calls no backend.

The public Astro landing is a separate repository, `jterrazz/cap01-website`.
It is not part of the product build or local workspace state.
