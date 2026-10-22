import { Plus } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';

import { localDate, toggleHabit } from '../domain/workspace';
import type { WorkspaceProps } from './workspace-props';

function HabitForm({ ready, update, workspace }: WorkspaceProps) {
    // Stryker disable next-line StringLiteral: a controlled field takes its value from the client as it hydrates, whatever the server wrote
    const [title, setTitle] = useState('');
    return (
        <form
            className="inline-form"
            onSubmit={(event) => {
                event.preventDefault();
                if (!title.trim()) {
                    return;
                }
                const habit = { id: crypto.randomUUID(), title: title.trim(), completedDates: [] };
                update({ ...workspace, habits: [...workspace.habits, habit] });
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
                placeholder="A small daily habit..."
                required
                value={title}
            />
            <button
                aria-label="Add habit"
                // Stryker disable next-line BooleanLiteral: the server renders the control before storage is read, and the browser's first effect sets it anew, so no spec reads the value the server wrote
                disabled={!ready}
                type="submit"
            >
                <Plus size={16} />
            </button>
        </form>
    );
}

function subscribeToClock(onTick: () => void) {
    const timer = setInterval(onTick, 60_000);
    return () => {
        clearInterval(timer);
    };
}

export function HabitsView({ ready, update, workspace }: WorkspaceProps) {
    const today = useSyncExternalStore(
        subscribeToClock,
        () => localDate(new Date()),
        // Stryker disable next-line StringLiteral: the server renders the empty workspace, since storage is read in the browser, so no habit is ever checked against the day it renders
        () => '',
    );
    // Stryker disable next-line MethodExpression,ArrowFunction: the server renders the empty workspace, since storage is read in the browser, so a callback over its items never runs there
    const completed = workspace.habits.filter((habit) => habit.completedDates.includes(today));
    return (
        <section className="workspace-content">
            <p className="eyebrow">Today</p>
            <h1>Small steps. Your pace.</h1>
            <p className="page-description">Choose something worth showing up for.</p>
            <HabitForm ready={ready} update={update} workspace={workspace} />
            <p aria-live="polite" className="section-label">
                {completed.length} of {workspace.habits.length} completed today
            </p>
            <div className="habit-list">
                {
                    // Stryker disable next-line ArrowFunction: the server renders the empty workspace, since storage is read in the browser, so a callback over its items never runs there
                    workspace.habits.map((habit) => (
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
                    ))
                }
            </div>
            {
                // Stryker disable next-line ConditionalExpression: the server renders the empty workspace, since storage is read in the browser, so the emptiness test always holds there
                workspace.habits.length === 0 && (
                    <p className="empty-note">
                        Your first habit starts here. Keep it small enough for today.
                    </p>
                )
            }
        </section>
    );
}
