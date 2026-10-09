import { Check } from 'lucide-react';
import { useState } from 'react';

import type { WorkspaceProps } from './workspace-props';

export function GoalsView({ workspace, update, ready }: WorkspaceProps) {
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
