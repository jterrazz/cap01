# Data

PostgreSQL, reached through Prisma 4.

The whole schema is one model — `User`, an autoincrementing `id` and a
unique `email` (`prisma/schema.prisma`) — carried by a single migration,
`user_base` (`prisma/migrations/`). No habit, goal or coaching concept
exists in the schema yet.

The Prisma commands are wrapped by the Makefile: `db-deploy` applies
migrations, `db-migrate` prompts for a name and creates one, `db-explore`
opens Prisma Studio. All three run locally against the environment
`scripts/environment.sh` exports, not inside the container.

A schema change ships with its migration, generated through
`make db-migrate` — never a hand-written file under `prisma/migrations/`.
