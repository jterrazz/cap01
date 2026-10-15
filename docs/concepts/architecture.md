# Architecture

`cap01` is the product workspace: npm workspaces resolve the dependencies,
Turborepo runs the build and test tasks, and `@jterrazz/typescript` judges every
member from the root.

## The workspace

The root lists its members in `package.json`'s `workspaces`, declares no kind
and owns no product code. `apps/web` is the only member: a `website` on the
`react` platform. A product API and an Expo native client are planned
boundaries; none is scaffolded, and a member joins the workspace only when it
has real code and a contract to own. The client calls no backend.

The public Astro landing is a separate repository, `jterrazz/cap01-website`, and
is not part of this build or of the workspace's state.

## The web app

React Router in framework mode owns routing, server rendering and client
navigation; Vite bundles it. Its code has three layers:

| Folder              | Holds                                                                       |
| ------------------- | --------------------------------------------------------------------------- |
| `src/app/`          | the document, the route table and the thin route modules React Router reads |
| `src/presentation/` | the shell — top bar, sidebar, dialog — the views, and the hooks they use    |
| `src/domain/`       | habits, journal entries and the intention, with no React and no storage     |

The root path opens Mobile. Named routes serve Today, Journal, Goals, Overview,
Coach, Insights and three life areas; the view loader answers any other address
with a 404, which the root's error boundary renders as a page of the app. The area
pages lead into the one shared workspace and do not filter saved data.

## State

The workspace — habits with their dated completions, journal entries, one
intention — is one validated, versioned document in `localStorage`. The domain
parser refuses a malformed document rather than reading part of it; when it
cannot be read or written, the app says so and keeps changes for the session.
A completion belongs to the reader's local calendar day, not a UTC one.

Nothing is deployed. No authentication, AI backend, analytics, sync or pairing is
connected, and the screens that name one say it is unavailable.
