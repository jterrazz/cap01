# Test

What proves a change here: the vitest projects of the web app, which test to
write, where each sits, and the mutation verdict. How to write a spec is
`@jterrazz/test`'s manual; this page is what this workspace adds to it.

## The projects

The projects are read off the app's tree; `npm test` at the root runs them after
the build.

| Project   | Collects                              | Runs                                                        |
| --------- | ------------------------------------- | ----------------------------------------------------------- |
| `unit`    | `apps/web/src/**/__tests__/*.test.ts` | Node — a module test, in the `__tests__/` of its module     |
| `website` | `apps/web/specs/website/**/*.spec.ts` | the production server on a free `PORT`, a headless Chromium |

## Which test to write

The default is a website spec: a page met through its address, against the
production build, each visit in a fresh browser context whose storage starts
empty. It never shares the development server.

A module test is kept for a pure algorithm whose edge cases no page reaches
cheaply. There is one: `src/domain/__tests__/workspace.test.ts`, the stored
document's parser — every shape it refuses — the habit toggle and the local day.

## Where a spec sits

`apps/web/specs/website/` holds one folder per page — `today`, `journal`,
`goals`, `overview`, `coach`, `insights`, `mind`, `mobile`, `not-found` — and a
spec visits that page alone, beside the runner `website.specification.ts`. Each
compares the page's ARIA outline whole, written in place, and states the console
empty. A page that renders a date or counts a day pins the calendar (`.clock`),
and an entry's generated id is a `{{uuid}}` token.

Layout, focus order and the narrow-screen sidebar are reviewed by hand, at desktop
and phone widths: no spec measures geometry. No spec claims that pairing or
coaching exists.

## Mutation

`make check` ends on `typescript mutation`, the zero-survivor verdict over the
change. The domain is measured by its module tests, the views by the website
specs: the server renders a view under the mutant, the browser hydrates it with
the client bundle, which carries none, and the specs read the hydrated page.
What the server renders as text or structure is seen there, and a mutant of a
view's routing, its copy or its links is killed like any other.

Four things the server renders are not seen, and each is declared where it
stands with a `// Stryker disable next-line` and its reason: an attribute
hydration keeps without comparing it (`aria-current`, a class name, `disabled`
while storage is read), a controlled field's value, which the client sets as it
hydrates, a branch over the workspace or a query, which are always empty on the
server since storage is read in the browser, and a callback's dependencies,
which only an effect reads, and the server runs none. A handler runs only in the
browser, where no mutant is active: the run counts its mutants, unjudged. Two
modules hold nothing else — the keydown listener (`use-escape.ts`) and the
dialog, which renders through a portal only the browser mounts
(`workspace-dialog.tsx`) — and `apps/web/jterrazz.config.ts` leaves them out by
file.
