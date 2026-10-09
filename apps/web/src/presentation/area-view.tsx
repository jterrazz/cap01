import { ArrowUpRight, Folder } from 'lucide-react';
import { Link } from 'react-router';

export function AreaView({ label }: { label: string }) {
    return (
        <section className="workspace-content">
            <Folder aria-hidden="true" className="page-symbol" size={28} />
            <h1>{label}</h1>
            <p className="page-description">Make space for this part of your life.</p>
            <div className="summary-list">
                <Link to="/today">
                    Build a small habit
                    <ArrowUpRight size={14} />
                </Link>
                <Link to="/journal">
                    Write a reflection
                    <ArrowUpRight size={14} />
                </Link>
                <Link to="/goals">
                    Set an intention
                    <ArrowUpRight size={14} />
                </Link>
            </div>
            <p className="empty-note">
                Area-specific organization is coming. Your entries currently share one personal
                workspace.
            </p>
        </section>
    );
}
