import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

import type { Workspace } from '../domain/workspace';

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
