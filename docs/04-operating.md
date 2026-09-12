# Operating

This repository runs a local prototype; nothing is deployed by this bootstrap.

```sh
npm run dev
npm run build
PORT=4342 npm run start
```

The standard React Router Node server serves `.artifacts/react-router`.
Build and cache outputs stay under `.artifacts/`; generated route types use the
framework-owned ignored `.react-router/types` directory.

Shared CI validates with Node 24 and browser support. Authentication, deployment,
sync and backend services remain unset. Clearing browser storage removes local
entries; no remote backup exists.
