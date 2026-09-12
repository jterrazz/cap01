# Testing

Tests protect actions whose failure would otherwise look successful.

Domain tests cover persisted-data validation and day-specific habit completion.
The `@jterrazz/test` website project exercises production routes, habit progress,
journal persistence across a reload and the honest pairing dialog.

```sh
npm run build
npm test
```

The runner chooses a free port through `PORT`, with isolated browser storage per
journey. It does not share the live preview. Responsive geometry and focus need
manual browser review at desktop and narrow mobile widths. These tests do not
claim that mobile pairing or AI coaching services exist.
