import { ArrowUpRight, Menu, Search } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router';

import type { Workspace } from '../domain/workspace';
import { areaLinks, mainTabs, workspaceLinks } from './shell-links';
import { useEscape } from './use-escape';

function SearchResults({ search, workspace }: { search: string; workspace: Workspace }) {
    const pages = [...workspaceLinks, ...areaLinks].filter((item) =>
        item.label.toLowerCase().includes(search),
    );
    const entries = workspace.entries.filter((entry) => entry.body.toLowerCase().includes(search));
    return (
        <div className="search-results">
            <p className="section-label">Pages</p>
            {pages.map((item) => (
                <Link key={item.href} to={item.href}>
                    {item.label}
                    <ArrowUpRight size={12} />
                </Link>
            ))}
            {pages.length === 0 && <p>No matching pages.</p>}
            {entries.map((entry) => (
                <Link key={entry.id} to={`/journal#${entry.id}`}>
                    {entry.body.slice(0, 80)}
                </Link>
            ))}
        </div>
    );
}

type TopBarProps = {
    menuOpen: boolean;
    onToggleMenu: () => void;
    view: string;
    workspace: Workspace;
};

export function TopBar({ menuOpen, onToggleMenu, view, workspace }: TopBarProps) {
    const [query, setQuery] = useState('');
    useEscape(
        useCallback(() => {
            setQuery('');
        }, []),
    );
    const search = query.trim().toLowerCase();
    return (
        <header className="topbar">
            <button
                aria-controls="workspace-sidebar"
                aria-expanded={menuOpen}
                aria-label="Toggle navigation"
                className="menu-toggle icon-button"
                onClick={onToggleMenu}
                type="button"
            >
                <Menu size={18} />
            </button>
            <Link aria-label="cap01 home" className="brand" to="/">
                <span aria-hidden="true" className="brand-symbol">
                    ✳
                </span>
            </Link>
            <nav aria-label="Main" className="top-tabs">
                {mainTabs.map(({ href, label, icon: Icon }) => (
                    <Link
                        aria-current={href === `/${view}` ? 'page' : undefined}
                        key={href}
                        to={href}
                    >
                        <Icon aria-hidden="true" size={14} />
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>
            <div className="search-wrap">
                <Search aria-hidden="true" size={14} />
                <input
                    aria-label="Search workspace"
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                    placeholder="Search"
                    value={query}
                />
                {search && <SearchResults search={search} workspace={workspace} />}
            </div>
        </header>
    );
}
