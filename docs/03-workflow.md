# Workflow

Everything runs through the Makefile, which runs everything through Docker
Compose. There is no supported way to work outside the container.

## The stack

The Compose project is `life-captain` (`scripts/docker/docker-compose.yml`):
the api service, a postgres, and a migration service that applies the
schema before the api starts. `make start-infra` brings up the two
infrastructure services alone; `make start-dev` runs the api with `src/`,
`__tests__/` and `prisma/` mounted so a change is picked up without a
rebuild.

## The targets

| Target            | Does                                           |
| ----------------- | ---------------------------------------------- |
| `make build`      | Builds the image                               |
| `make start`      | Runs the compiled server                       |
| `make start-dev`  | Runs the server in watch mode, sources mounted |
| `make test`       | Runs Jest, unit and end-to-end                 |
| `make lint-type`  | `tsc --noEmit`                                 |
| `make lint-code`  | ESLint                                         |
| `make lint-style` | Prettier                                       |

## Tests

Unit tests sit beside the code they cover, in `__tests__/` folders under
`src/`. The end-to-end tests are the top-level `__tests__/e2e/`: they run
against a real Postgres, seeded from `__tests__/e2e/seeds/`, with the
database created by `scripts/docker/postgres/init-test-database.sql` and
the lifecycle handled by `__tests__/configuration/global-setup.ts` and its
teardown.

## CI

One GitHub Actions workflow, `.github/workflows/quality.yml`, on push to
`main` and `develop`. It has four jobs and each one runs the matching make
target, so CI and a local run execute the same thing.

## None of it runs today

`npm ci` fails, so every target that builds the image fails with it. The
lockfile pins `@jterrazz/package-typescript`,
`@jterrazz/package-typescript-quality` and
`@jterrazz/package-typescript-test`, and none of the three is on npm any
more — the family was renamed. Verified 2026-09-06.

Reviving the tree means moving to the current packages and regenerating the
lockfile. Until someone does, the targets above describe the intent, not a
working command.
