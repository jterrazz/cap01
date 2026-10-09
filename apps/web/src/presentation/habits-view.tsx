import { Plus } from 'lucide-react';
import { useState } from 'react';

import { localDate, toggleHabit } from '../domain/workspace';
import type { WorkspaceProps } from './workspace-props';

function HabitForm({ ready, update, workspace }: WorkspaceProps) {
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
                placeholder="A small daily habit…"
                required
                value={title}
            />
            <button aria-label="Add habit" disabled={!ready} type="submit">
                <Plus size={16} />
            </button>
        </form>
    );
}

export function HabitsView({ ready, update, workspace }: WorkspaceProps) {
    const today = localDate(new Date());
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
