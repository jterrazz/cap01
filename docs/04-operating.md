# Operating

How it runs: the image the Dockerfile builds, the Compose stack that wires
it to a database, the configuration it reads, and what merging to `main`
does and does not do.

## The image

`Dockerfile` builds on `node:20.12-alpine` in three steps: install
dependencies with `npm ci` (copying only the two manifest files first, so
the layer caches), copy the rest of the application, then run
`npx prisma generate`. `Dockerfile.dockerignore` keeps `.github`, `.git`,
`node_modules` and `**/local.yml` out of the build context.

## The stack

The Compose project is `life-captain`
(`scripts/docker/docker-compose.yml`), with three services:

| Service                          | Is                                                             |
| --------------------------------- | -------------------------------------------------------------- |
| `life-captain-api`                | the image above, built from the repository root                |
| `life-captain-database`           | `postgres:15.2-alpine`, port `5432`, a healthcheck on `pg_isready` |
| `life-captain-database-migration` | the same image, run once as `make db-deploy` after the database is healthy |

`make start-infra` brings up the two infrastructure services alone;
`make start` and `make start-dev` run the api on top of them — the targets
themselves are [Developing](02-developing.md)'s. The database is seeded by
`scripts/docker/postgres/` on first boot, mounted at
`/docker-entrypoint-initdb.d`.

## Configuration

`scripts/environment.sh` exports `DATABASE_URL`, switching the host between
`life-captain-database` (inside a container: `/.dockerenv` present, or
`ENVIRONMENT=docker`) and `localhost` (run from the host, as the `db-*`
Makefile targets do).

The application's own configuration is layered through `node-config` and
Zod ([Architecture](01-architecture.md)):
`src/configuration/values/{development,production,test}.yml` hold the
per-environment defaults for `PORT` and `LOGGER_LEVEL`, and
`custom-environment-variables.yml` maps `PORT`, `LOGGER_LEVEL` and
`DATABASE_URL` back onto the matching environment variable.

There is no secret beyond the development database password committed in
`scripts/environment.sh` and the compose file — both `postgres`/`postgres`,
never used past a developer's own machine.

## Shipping

`.github/workflows/quality.yml` is the only workflow: it runs the four
quality targets on push to `main` and `develop` and stops there. Nothing
builds a publishable image, tags a release or deploys anywhere — merging to
`main` runs the checks and nothing else. Running the service anywhere is a
manual `make build` plus `make start` (or the Compose stack directly)
against wherever `DATABASE_URL` is pointed.
