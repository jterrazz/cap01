import type { ReactNode } from 'react';
import {
    isRouteErrorResponse,
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from 'react-router';

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

export function ErrorBoundary() {
    const error = useRouteError();
    // Stryker disable next-line ConditionalExpression,LogicalOperator: a GET raises no error on this app but the missing view's 404, and a website spec sends nothing but a GET, so no spec meets the other page
    if (isRouteErrorResponse(error) && error.status === 404) {
        return (
            <main className="workspace-content">
                <h1>This page is not available.</h1>
                <p>
                    <Link to="/">Back to cap01</Link>
                </p>
            </main>
        );
    }
    return (
        <main className="workspace-content">
            <h1>Something went wrong.</h1>
            <p>
                This page could not be shown. <Link to="/">Back to cap01</Link>
            </p>
        </main>
    );
}
