# Testing

`make check` runs the web quality gate, production build and six behavior tests.

The two domain tests validate local state transitions and malformed persisted data.
Four production browser journeys cover navigation, habit progress, journal reload
persistence and the unavailable pairing dialog. Their source remains beside the
application under `apps/web`; see its [testing chapter](../apps/web/docs/03-testing.md).

The website runner executes `npm run start` from the web workspace and supplies
a free `PORT`. It never reuses the live development server. No API or Expo tests
are claimed before those clients exist.
