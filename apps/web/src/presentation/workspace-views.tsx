import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { localDate, toggleHabit } from '../domain/workspace';
import type { Workspace } from '../domain/workspace';

type Props = { workspace: Workspace; update: (next: Workspace) => void; ready: boolean };
export function HabitsView({ workspace, update, ready }: Props) {
    const [title, setTitle] = useState('');
    const today = localDate(new Date());
    const completed = workspace.habits.filter((habit) =>
        habit.completedDates.includes(today),
    ).length;
    return (
        <section className="workspace-content">
            <p className="eyebrow">Today</p>
            <h1>Small steps. Your pace.</h1>
            <p className="page-description">Choose something worth showing up for.</p>
            <form
                className="inline-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    if (!title.trim()) {
                        return;
                    }
                    update({
                        ...workspace,
                        habits: [
                            ...workspace.habits,
                            { id: crypto.randomUUID(), title: title.trim(), completedDates: [] },
                        ],
                    });
                    setTitle('');
                }}
            >
                <label className="visually-hidden" htmlFor="habit-title">
                    New habit
                </label>
                <input
                    id="habit-title"
                    maxLength={120}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                    placeholder="A small daily habit…"
                    required
                    value={title}
                />
                <button aria-label="Add habit" disabled={!ready} type="submit">
                    <Plus size={16} />
                </button>
            </form>
            <p aria-live="polite" className="section-label">
                {completed} of {workspace.habits.length} completed today
            </p>
            <div className="habit-list">
                {workspace.habits.map((habit) => (
                    <label className="habit-row" key={habit.id}>
                        <input
                            checked={habit.completedDates.includes(today)}
                            onChange={() => {
                                update(toggleHabit(workspace, habit.id, today));
                            }}
                            type="checkbox"
                        />
                        <span>{habit.title}</span>
                    </label>
                ))}
            </div>
            {workspace.habits.length === 0 && (
                <p className="empty-note">
                    Your first habit starts here. Keep it small enough for today.
                </p>
            )}
        </section>
    );
}
export function JournalView({ workspace, update, ready }: Props) {
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
                    update({
                        ...workspace,
                        entries: [
                            {
                                id: crypto.randomUUID(),
                                body: body.trim(),
                                createdAt: new Date().toISOString(),
                            },
                            ...workspace.entries,
                        ],
                    });
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
            <div aria-live="polite" className="journal-entries">
                {workspace.entries.map((entry) => (
                    <article className="journal-entry" id={entry.id} key={entry.id}>
                        <time dateTime={entry.createdAt}>
                            {new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(
                                new Date(entry.createdAt),
                            )}
                        </time>
                        <p>{entry.body}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
export function GoalsView({ workspace, update, ready }: Props) {
    const [goal, setGoal] = useState<null | string>(null);
    const [saved, setSaved] = useState(false);
    return (
        <section className="workspace-content">
            <p className="eyebrow">Goals</p>
            <h1>Give your days a direction.</h1>
            <p className="page-description">One meaningful intention is a good place to begin.</p>
            <form
                className="journal-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    update({ ...workspace, goal: (goal ?? workspace.goal).trim() });
                    setSaved(true);
                }}
            >
                <label htmlFor="goal">What are you working towards?</label>
                <textarea
                    id="goal"
                    maxLength={1000}
                    onChange={(event) => {
                        setGoal(event.target.value);
                        setSaved(false);
                    }}
                    rows={3}
                    value={goal ?? workspace.goal}
                />
                <button className="primary-button" disabled={!ready} type="submit">
                    Save intention
                </button>
                {saved && (
                    <output className="save-message">
                        <Check size={14} /> Intention saved
                    </output>
                )}
            </form>
        </section>
    );
}
export function OverviewView({
    workspace,
    view,
    onCheckIn,
}: {
    workspace: Workspace;
    view: string;
    onCheckIn: () => void;
}) {
    const title =
        view === 'insights'
            ? 'Notice what is taking shape.'
            : view === 'coach'
              ? 'Start with where you are.'
              : 'A little more intentional.';
    return (
        <section className="workspace-content">
            <p className="eyebrow">
                {view === 'insights' ? 'Insights' : view === 'coach' ? 'Coach' : 'Overview'}
            </p>
            <h1>{title}</h1>
            <p className="page-description">
                A quiet place to reflect, build habits and find your next step.
            </p>
            <button className="primary-button" onClick={onCheckIn} type="button">
                New check-in
            </button>
            <div className="summary-list">
                <Link to="/today">
                    <span>Habits you are building</span>
                    <strong>{workspace.habits.length}</strong>
                    <ArrowUpRight size={14} />
                </Link>
                <Link to="/journal">
                    <span>Thoughts you have kept</span>
                    <strong>{workspace.entries.length}</strong>
                    <ArrowUpRight size={14} />
                </Link>
                <Link to="/goals">
                    <span>{workspace.goal || 'Find your next direction'}</span>
                    <ArrowUpRight size={14} />
                </Link>
            </div>
            <p className="empty-note">
                This preview keeps your notes in this browser. AI coaching is not connected yet.
            </p>
        </section>
    );
}
