# The capitaine-api corpus

The manual for this repository. `README.md` is the vitrine, `AGENTS.md`
routes; the chapters below are where the knowledge is written.

## Chapters

| Chapter                                  | Holds                                                             |
| ---------------------------------------- | ----------------------------------------------------------------- |
| [Architecture](01-architecture.md)       | The ports-and-adapters layers, the HTTP surface, the wiring       |
| [Data](02-data.md)                       | The Prisma schema, its one migration, the PostgreSQL setup        |
| [Workflow](03-workflow.md)               | The Makefile targets, the Docker Compose stack, the tests, the CI |
| [State and names](04-state-and-names.md) | What is built and what is not, and the former names still in code |

`docs/decisions/` holds this repository's decision records. It is empty: no
rationale was ever written down here to backfill one from.
