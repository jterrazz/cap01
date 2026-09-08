# The capitaine-api corpus

The manual for this repository. `README.md` is the vitrine, `AGENTS.md`
routes; the chapters below are where the knowledge is written.

## Chapters

| Chapter                                  | Holds                                                              |
| ----------------------------------------- | ------------------------------------------------------------------- |
| [Architecture](01-architecture.md)       | The ports-and-adapters layers, the HTTP surface, the wiring         |
| [Developing](02-developing.md)           | The Makefile-through-Docker toolchain, the targets, CI              |
| [Testing](03-testing.md)                 | The unit and end-to-end suites, the fixtures, what a change owes    |
| [Operating](04-operating.md)             | The Dockerfile, the Compose stack, config, and what merging deploys |
| [Data](05-data.md)                       | The Prisma schema, its one migration, the PostgreSQL setup          |
| [State and names](06-state-and-names.md) | What is built and what is not, and the former names still in code   |

`docs/decisions/` holds this repository's decision records. It is empty: no
rationale was ever written down here to backfill one from.
