# Testing

What proves a change: Jest, run as unit tests beside the code and as
end-to-end tests against a real Postgres, both driven by `make test`.

## Unit tests

Unit tests sit beside the code they cover, in `__tests__/` folders under
`src/` — for example `src/configuration/__tests__/configuration.test.ts`.
They exercise a use-case or a schema without a database.

## End-to-end tests

The end-to-end tests are the top-level `__tests__/e2e/`, mirroring the HTTP
surface: `__tests__/e2e/api/api/health/get.test.ts` for the health check,
`` __tests__/e2e/api/users/:id/get.test.ts `` for the user lookup, and
`__tests__/e2e/repositories/prisma.user-repository.test.ts` for the
repository itself.

They run against a real Postgres, seeded from `__tests__/e2e/seeds/`, with
the database created by `scripts/docker/postgres/init-test-database.sql`
and the lifecycle handled by `__tests__/configuration/global-setup.ts` and
`global-teardown.ts`. Shared request and database helpers live in
`__tests__/e2e/context.ts`, `database.context.ts` and `request.context.ts`.

## What a change owes

A new route ships with an end-to-end spec under `__tests__/e2e/`; a new
use-case ships with a unit test beside it.

## Today

`make test` is the gesture that runs both suites, inside the container
built by the Makefile ([Developing](02-developing.md)). That build fails —
`npm ci` cannot resolve the renamed `@jterrazz/package-typescript*` family
— so today nothing in this chapter actually runs; the tests above exist as
code, not as a passing suite. [Developing](02-developing.md) § "None of it
runs today" carries the fact once.
