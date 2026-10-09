import { useState } from 'react';

import type { Workspace } from '../domain/workspace';
import type { WorkspaceProps } from './workspace-props';

// Stryker disable next-line ObjectLiteral: the server renders the empty workspace, since storage is read in the browser, so no date is formatted there
const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

function JournalEntries({ workspace }: { workspace: Workspace }) {
    return (
        <div aria-live="polite" className="journal-entries">
            {
                // Stryker disable next-line ArrowFunction: the server renders the empty workspace, since storage is read in the browser, so a callback over its items never runs there
                workspace.entries.map((entry) => (
                    <article className="journal-entry" id={entry.id} key={entry.id}>
                        <time dateTime={entry.createdAt}>
                            {dateFormat.format(new Date(entry.createdAt))}
                        </time>
                        <p>{entry.body}</p>
                    </article>
                ))
            }
        </div>
    );
}

export function JournalView({ ready, update, workspace }: WorkspaceProps) {
    // Stryker disable next-line StringLiteral: a controlled field takes its value from the client as it hydrates, whatever the server wrote
    const [body, setBody] = useState('');
    return (
        <section className="workspace-content">
            <p className="eyebrow">Journal</p>
            <h1>A little room to think.</h1>
            <p className="page-description">What is on your mind today?</p>
            <form
                className="journal-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    if (!body.trim()) {
                        return;
                    }
                    const entry = {
                        id: crypto.randomUUID(),
                        body: body.trim(),
                        createdAt: new Date().toISOString(),
                    };
                    update({ ...workspace, entries: [entry, ...workspace.entries] });
                    setBody('');
                }}
            >
                <label className="visually-hidden" htmlFor="journal-entry">
                    Journal entry
                </label>
                <textarea
                    id="journal-entry"
                    maxLength={10_000}
                    onChange={(event) => {
                        setBody(event.target.value);
                    }}
                    placeholder="Start anywhere…"
                    required
                    rows={5}
                    value={body}
                />
                <button
                    className="primary-button"
                    // Stryker disable next-line BooleanLiteral: the server renders the control before storage is read, and the browser's first effect sets it anew, so no spec reads the value the server wrote
                    disabled={!ready}
                    type="submit"
                >
                    Save entry
                </button>
            </form>
            <JournalEntries workspace={workspace} />
        </section>
    );
}
