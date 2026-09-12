# Architecture

React Router framework mode owns routing, server rendering and client navigation;
Vite supplies development and production bundles. React renders the workspace.

`src/app` contains the document and thin route modules. `src/presentation` owns
the shell, screens and browser persistence hook. `src/domain/workspace.ts`
defines local habits, journal entries and intentions without React or storage.

The root opens Mobile. Named routes expose Today, Journal, Goals, Overview,
Coach, Insights and three life areas. Unknown routes return 404. Area screens
currently lead into a shared workspace, without pretending to filter saved data.

A validated, versioned localStorage document stores habits, dated completions,
entries and an intention. Failed storage is reported and changes stay in the
current session. No authentication, AI backend, analytics or pairing is connected.

The chosen product direction separates this web app from an Astro public landing
and an Expo native client. A common API remains a future boundary.
