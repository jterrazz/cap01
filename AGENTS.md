# Agent brief — capitaine-api

The backend for Capitaine, an AI habit and growth coach. A hexagonal Koa +
Prisma/PostgreSQL service on Node 20.12, ESM, compiled with SWC. This file
routes; the corpus is `docs/`, and it is not restated here.

## Mental model

- Scaffold-complete, product-empty: the ports-and-adapters architecture is
  finished, the coaching domain is not started. The HTTP surface is a
  health check and a user lookup, and the schema is one `User` model.
- Every layer is reached through a port. A new capability adds a use-case
  in `src/domain/`, an interface in `src/ports/`, an implementation in
  `src/infrastructure/`, and a binding in `src/container/`.
- Nothing runs outside Docker. The Makefile is the entrypoint for build,
  run, test and lint, and CI runs the same targets.
- The tree still carries the product's two former names. Read
  `docs/06-state-and-names.md` before assuming an identifier is a typo.

## Where knowledge lives

The corpus map is `docs/README.md`.

| Working on…                             | Read                          |
| ---------------------------------------- | ------------------------------ |
| Layers, ports, the HTTP surface         | `docs/01-architecture.md`     |
| The Makefile, Docker, CI                | `docs/02-developing.md`       |
| The suites, the fixtures                | `docs/03-testing.md`          |
| The image, the Compose stack, config    | `docs/04-operating.md`        |
| The Prisma schema and its migrations    | `docs/05-data.md`             |
| What is built, and the former names     | `docs/06-state-and-names.md`  |
| Why a choice was made                   | `docs/decisions/`             |

The product knowledge behind the repository — the vision, the glossary,
what Capitaine is for — is not here: it is the brand corpus in
`jterrazz-os`, at `home/capitaine/wiki/`.

## Commands

```bash
make build       # Build the image
make start-dev   # Run in watch mode, sources mounted
make test        # Jest, unit and end-to-end
make lint-type   # tsc --noEmit
make lint-code   # ESLint
make lint-style  # Prettier
```

## Standing rules

- A change to behaviour updates the matching `docs/` chapter in the same
  change. The chapters are the manual; this brief only points at them.
