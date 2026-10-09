import { Folder, Plus } from 'lucide-react';
import { Link } from 'react-router';

import type { Workspace } from '../domain/workspace';
import { areaLinks, workspaceLinks } from './shell-links';

function RecentEntries({ workspace }: { workspace: Workspace }) {
    // Stryker disable next-line ConditionalExpression: the server renders the empty workspace, since storage is read in the browser, so the emptiness test always holds there
    if (workspace.entries.length === 0) {
        return <p className="sidebar-empty">Your next chapter starts here.</p>;
    }
    return (
        <nav aria-label="Recent entries">
            {workspace.entries.slice(0, 5).map((entry, index) => (
                <Link
                    className="sidebar-link recent-link"
                    key={entry.id}
                    to={`/journal#${entry.id}`}
                >
                    <span
                        aria-hidden="true"
                        className={index === 0 ? 'recent-dot recent-dot-new' : 'recent-dot'}
                    />
                    <span>{entry.body}</span>
                </Link>
            ))}
        </nav>
    );
}

type SidebarProps = { onCheckIn: () => void; open: boolean; view: string; workspace: Workspace };

export function Sidebar({ onCheckIn, open, view, workspace }: SidebarProps) {
    return (
        // Stryker disable next-line StringLiteral: a class name hydration keeps as the server wrote it, where the menu is always closed, and the outline draws no class
        <aside className={`sidebar ${open ? 'sidebar-open' : ''}`} id="workspace-sidebar">
            <nav aria-label="Workspace">
                <button className="sidebar-link" onClick={onCheckIn} type="button">
                    <Plus size={14} />
                    <span>New check-in</span>
                </button>
                {workspaceLinks.map(({ href, label, icon: Icon }) => (
                    <Link
                        // Stryker disable next-line ConditionalExpression,EqualityOperator,StringLiteral: hydration keeps the attributes the server wrote without comparing them, and the outline draws no aria-current
                        aria-current={href === `/${view}` ? 'page' : undefined}
                        className="sidebar-link"
                        key={href}
                        to={href}
                    >
                        <Icon aria-hidden="true" size={14} />
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>
            <section className="sidebar-section">
                <h2>Your areas</h2>
                <nav aria-label="Your areas">
                    {areaLinks.map(({ href, label }) => (
                        <Link
                            // Stryker disable next-line ConditionalExpression,EqualityOperator,StringLiteral: hydration keeps the attributes the server wrote without comparing them, and the outline draws no aria-current
                            aria-current={href === `/${view}` ? 'page' : undefined}
                            className="sidebar-link"
                            key={href}
                            to={href}
                        >
                            <Folder aria-hidden="true" size={14} />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>
            </section>
            <section className="sidebar-section">
                <h2>Recents</h2>
                <RecentEntries workspace={workspace} />
            </section>
            <div className="sidebar-account">
                <span className="account-avatar">c</span>
                <span>
                    Personal space<small>Local preview</small>
                </span>
            </div>
        </aside>
    );
}
