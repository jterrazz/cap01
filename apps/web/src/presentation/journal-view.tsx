import { useState } from 'react';

import type { Workspace } from '../domain/workspace';
import type { WorkspaceProps } from './workspace-props';

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

function JournalEntries({ workspace }: { workspace: Workspace }) {
    return (
        <div aria-live="polite" className="journal-entries">
            {workspace.entries.map((entry) => (
                <article className="journal-entry" id={entry.id} key={entry.id}>
                    <time dateTime={entry.createdAt}>
                        {dateFormat.format(new Date(entry.createdAt))}
                    </time>
                    <p>{entry.body}</p>
                </article>
            ))}
        </div>
    );
}

export function JournalView({ ready, update, workspace }: WorkspaceProps) {
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
                <button className="primary-button" disabled={!ready} type="submit">
                    Save entry
                </button>
            </form>
            <JournalEntries workspace={workspace} />
        </section>
    );
}
