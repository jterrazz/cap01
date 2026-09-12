import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import './globals.css';

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta content="noindex,nofollow" name="robots" />
                <title>cap01 — A little more intentional</title>
                <meta
                    content="A quiet place to reflect, build habits and find your next step."
                    name="description"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
export default function App() {
    return <Outlet />;
}
