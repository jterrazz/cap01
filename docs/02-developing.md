# Developing

How a change is made: the Makefile is the one entrypoint, every target runs
through Docker, and CI runs the same targets a local change already ran.
There is no supported way to work outside the container.

## The targets

| Target            | Does                                            |
| ----------------- | ------------------------------------------------ |
| `make build`      | Builds the image                               |
| `make start`      | Runs the compiled server                       |
| `make start-dev`  | Runs the server in watch mode, sources mounted |
| `make test`       | Runs Jest, unit and end-to-end                 |
| `make lint-type`  | `tsc --noEmit`                                 |
| `make lint-code`  | ESLint                                         |
| `make lint-style` | Prettier                                       |

`make start-dev` mounts `src/`, `__tests__/` and `prisma/` into the
container (the `DOCKER_VOLUMES` in the Makefile), so a change is picked up
without a rebuild. What the container itself runs — the image, the Compose
stack, the ports — is [Operating](04-operating.md); what `make test` proves
is [Testing](03-testing.md).

## CI

One GitHub Actions workflow, `.github/workflows/quality.yml`, on push to
`main` and `develop`. It has four jobs — `test`, `lint-type`, `lint-code`,
`lint-style` — and each one runs the matching make target, so CI and a
local run execute the same thing. The workflow only checks; nothing in it
publishes an image or deploys.

## None of it runs today

`npm ci` fails, so every target that builds the image fails with it. The
lockfile pins `@jterrazz/package-typescript`,
`@jterrazz/package-typescript-quality` and
`@jterrazz/package-typescript-test`, and none of the three is on npm any
more — the family was renamed. Verified 2026-09-06.

Reviving the tree means moving to the current packages and regenerating the
lockfile. Until someone does, the targets above describe the intent, not a
working command.
