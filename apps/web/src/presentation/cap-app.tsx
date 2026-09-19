import {
    Close as DialogClose,
    Content as DialogContent,
    Description as DialogDescription,
    Overlay as DialogOverlay,
    Portal as DialogPortal,
    Root as DialogRoot,
    Title as DialogTitle,
} from '@radix-ui/react-dialog';
import {
    ArrowUpRight,
    BookOpen,
    ChartNoAxesCombined,
    Circle,
    Compass,
    Folder,
    Leaf,
    Menu,
    NotebookPen,
    Plus,
    Search,
    Smartphone,
    Sparkles,
    Target,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import { MobileView } from './mobile-view';
import { useWorkspace } from './use-workspace';
import { GoalsView, HabitsView, JournalView, OverviewView } from './workspace-views';

const navigation = [
    { href: '/overview', label: 'Overview', icon: Compass },
    { href: '/today', label: 'Habits', icon: Circle },
    { href: '/goals', label: 'Goals', icon: Target },
    { href: '/journal', label: 'Journal', icon: NotebookPen },
    { href: '/mobile', label: 'Mobile', icon: Smartphone },
];
const areas = [
    { href: '/mind', label: 'Mind & focus' },
    { href: '/health', label: 'Health & energy' },
    { href: '/work', label: 'Work & craft' },
];
const tabs = [
    { href: '/coach', label: 'Coach', icon: Sparkles },
    { href: '/today', label: 'Today', icon: Compass },
    { href: '/journal', label: 'Journal', icon: BookOpen },
    { href: '/insights', label: 'Insights', icon: ChartNoAxesCombined },
];

export function CapApp({ view }: { view: string }) {
    const dialogTrigger = useRef<HTMLElement | null>(null);
    const { workspace, update, ready, notice } = useWorkspace();
    const [dialog, setDialog] = useState<'check-in' | 'device' | null>(null);
    const [checkIn, setCheckIn] = useState('');
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = view === 'mobile';
    const selectedArea = areas.find((area) => area.href === `/${view}`);
    const search = query.trim().toLowerCase();
    const searchResults = [...navigation, ...areas].filter((item) =>
        item.label.toLowerCase().includes(search),
    );
    useEffect(() => {
        function dismiss(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setMenuOpen(false);
                setQuery('');
            }
        }
        globalThis.addEventListener('keydown', dismiss);
        return () => {
            globalThis.removeEventListener('keydown', dismiss);
        };
    }, []);
    function openDialog(kind: 'check-in' | 'device') {
        dialogTrigger.current =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setDialog(kind);
    }
    return (
        <div className="app-shell">
            <a className="skip-link" href="#main">
                Skip to content
            </a>
            <header className="topbar">
                <button
                    aria-controls="workspace-sidebar"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    className="menu-toggle icon-button"
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                    }}
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
                    {tabs.map(({ href, label, icon: Icon }) => (
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
                    {search && (
                        <div className="search-results">
                            <p className="section-label">Pages</p>
                            {searchResults.map((item) => (
                                <Link key={item.href} to={item.href}>
                                    {item.label}
                                    <ArrowUpRight size={12} />
                                </Link>
                            ))}
                            {searchResults.length === 0 && <p>No matching pages.</p>}
                            {workspace.entries
                                .filter((entry) => entry.body.toLowerCase().includes(search))
                                .map((entry) => (
                                    <Link key={entry.id} to={`/journal#${entry.id}`}>
                                        {entry.body.slice(0, 80)}
                                    </Link>
                                ))}
                        </div>
                    )}
                </div>
            </header>
            <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`} id="workspace-sidebar">
                <nav aria-label="Workspace">
                    <button
                        className="sidebar-link"
                        onClick={() => {
                            openDialog('check-in');
                            setMenuOpen(false);
                        }}
                        type="button"
                    >
                        <Plus size={14} />
                        <span>New check-in</span>
                    </button>
                    {navigation.map(({ href, label, icon: Icon }) => (
                        <Link
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
                        {areas.map(({ href, label }) => (
                            <Link
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
                    {workspace.entries.length ? (
                        <nav aria-label="Recent entries">
                            {workspace.entries.slice(0, 5).map((entry, index) => (
                                <Link
                                    className="sidebar-link recent-link"
                                    key={entry.id}
                                    to={`/journal#${entry.id}`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={
                                            index === 0 ? 'recent-dot recent-dot-new' : 'recent-dot'
                                        }
                                    />
                                    <span>{entry.body}</span>
                                </Link>
                            ))}
                        </nav>
                    ) : (
                        <p className="sidebar-empty">Your next chapter starts here.</p>
                    )}
                </section>
                <div className="sidebar-account">
                    <span className="account-avatar">c</span>
                    <span>
                        Personal space<small>Local preview</small>
                    </span>
                </div>
            </aside>
            <main className="main-content" id="main" tabIndex={-1}>
                {notice && <output className="storage-notice">{notice}</output>}
                {isMobile ? (
                    <MobileView
                        onConnect={() => {
                            openDialog('device');
                        }}
                    />
                ) : view === 'today' ? (
                    <HabitsView ready={ready} update={update} workspace={workspace} />
                ) : view === 'journal' ? (
                    <JournalView ready={ready} update={update} workspace={workspace} />
                ) : view === 'goals' ? (
                    <GoalsView ready={ready} update={update} workspace={workspace} />
                ) : selectedArea ? (
                    <section className="workspace-content">
                        <Folder aria-hidden="true" className="page-symbol" size={28} />
                        <h1>{selectedArea.label}</h1>
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
                            Area-specific organization is coming. Your entries currently share one
                            personal workspace.
                        </p>
                    </section>
                ) : (
                    <OverviewView
                        onCheckIn={() => {
                            openDialog('check-in');
                        }}
                        view={view}
                        workspace={workspace}
                    />
                )}
            </main>
            <DialogRoot
                onOpenChange={(open) => {
                    if (!open) {
                        setDialog(null);
                    }
                }}
                open={dialog !== null}
            >
                <DialogPortal>
                    <DialogOverlay className="dialog-overlay" />
                    <DialogContent
                        className="dialog-content"
                        onCloseAutoFocus={(event) => {
                            event.preventDefault();
                            const trigger = dialogTrigger.current;
                            if (
                                trigger !== null &&
                                trigger.isConnected &&
                                trigger.getClientRects().length > 0
                            ) {
                                trigger.focus();
                            } else {
                                document.querySelector<HTMLElement>('.menu-toggle')?.focus();
                            }
                        }}
                    >
                        <DialogClose aria-label="Close dialog" className="dialog-close icon-button">
                            <X size={16} />
                        </DialogClose>
                        {dialog === 'device' ? (
                            <>
                                <Smartphone
                                    aria-hidden="true"
                                    className="dialog-symbol"
                                    size={28}
                                />
                                <DialogTitle>A companion, in the making.</DialogTitle>
                                <DialogDescription>
                                    Mobile pairing is not available in this preview. Your habits and
                                    journal stay in this browser for now.
                                </DialogDescription>
                                <DialogClose className="primary-button">Got it</DialogClose>
                            </>
                        ) : (
                            <>
                                <Leaf aria-hidden="true" className="dialog-symbol" size={26} />
                                <DialogTitle>How are you arriving today?</DialogTitle>
                                <DialogDescription>
                                    A few words are enough. This check-in goes into your journal.
                                </DialogDescription>
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        if (!checkIn.trim()) {
                                            return;
                                        }
                                        update({
                                            ...workspace,
                                            entries: [
                                                {
                                                    id: crypto.randomUUID(),
                                                    body: checkIn.trim(),
                                                    createdAt: new Date().toISOString(),
                                                },
                                                ...workspace.entries,
                                            ],
                                        });
                                        setCheckIn('');
                                        setDialog(null);
                                    }}
                                >
                                    <label className="visually-hidden" htmlFor="check-in">
                                        Your check-in
                                    </label>
                                    <textarea
                                        id="check-in"
                                        maxLength={10_000}
                                        onChange={(event) => {
                                            setCheckIn(event.target.value);
                                        }}
                                        placeholder="Right now, I’m feeling…"
                                        required
                                        rows={4}
                                        value={checkIn}
                                    />
                                    <button
                                        className="primary-button"
                                        disabled={!ready}
                                        type="submit"
                                    >
                                        Save check-in
                                    </button>
                                </form>
                            </>
                        )}
                    </DialogContent>
                </DialogPortal>
            </DialogRoot>
        </div>
    );
}
