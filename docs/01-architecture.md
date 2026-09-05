# Architecture

A TypeScript service on Node 20.12, ESM, compiled with SWC. The
architecture is ports-and-adapters and it is finished; the domain it was
built for is not started.

## The layers

The `src/` tree spells the layering out.

| Layer                 | Holds                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `src/domain/`         | Models (`user`, `api-health`), use-cases (`get-user`, `get-api-health`), typed error hierarchy |
| `src/ports/`          | The interfaces: database, logger, repositories, server                                         |
| `src/adapters/`       | Koa route serializers and deserializers, and middlewares (api-version, error-handler)          |
| `src/infrastructure/` | Prisma database and repositories, Winston logger, HTTP error mapping                           |
| `src/application/`    | Entrypoints and the Koa server and router gateways                                             |
| `src/container/`      | Inversify bindings wiring the layers together                                                  |
| `src/configuration/`  | Zod-validated schemas over per-environment YAML, read through `node-config`                    |

## Repositories

A repository holds the data access logic, and it is the only kind of object
allowed to reach the database. Keeping it separate is what lets the
use-cases be tested without a database at all; the repositories themselves
are tested against a real one, in `__tests__/e2e/repositories/`.

## The HTTP surface

Two routes, each with an end-to-end spec under `__tests__/e2e/`:

- `GET /api/health` — the health check.
- `GET /users/:id` — the user lookup.

An error raised in the domain becomes a status code in
`src/infrastructure/http/get-http-response-from-error.ts`, reached through
the error-handler middleware.
