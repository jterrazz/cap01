import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { AreaView } from './area-view';
import { GoalsView } from './goals-view';
import { HabitsView } from './habits-view';
import { JournalView } from './journal-view';
import { MobileView } from './mobile-view';
import { OverviewView } from './overview-view';
import { areaLinks } from './shell-links';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';
import { useEscape } from './use-escape';
import { useWorkspace } from './use-workspace';
import { WorkspaceDialog } from './workspace-dialog';
import type { DialogKind } from './workspace-dialog';
import type { WorkspaceProps } from './workspace-props';

type ViewProps = WorkspaceProps & { onOpen: (kind: DialogKind) => void; view: string };

function CurrentView({ onOpen, ready, update, view, workspace }: ViewProps) {
    const area = areaLinks.find((link) => link.href === `/${view}`);
    if (view === 'mobile') {
        return (
            <MobileView
                onConnect={() => {
                    onOpen('device');
                }}
            />
        );
    }
    if (view === 'today') {
        return <HabitsView ready={ready} update={update} workspace={workspace} />;
    }
    if (view === 'journal') {
        return <JournalView ready={ready} update={update} workspace={workspace} />;
    }
    if (view === 'goals') {
        return <GoalsView ready={ready} update={update} workspace={workspace} />;
    }
    if (area) {
        return <AreaView label={area.label} />;
    }
    return (
        <OverviewView
            onCheckIn={() => {
                onOpen('check-in');
            }}
            view={view}
            workspace={workspace}
        />
    );
}

function MainContent({ children, notice }: { children: ReactNode; notice: string }) {
    return (
        <main
            className="main-content"
            id="main"
            // Stryker disable next-line UnaryOperator: hydration keeps the attributes the server wrote without comparing them, and the outline draws no tabindex
            tabIndex={-1}
        >
            {
                // Stryker disable next-line ConditionalExpression: the server renders before storage is read, so it has no notice to show, and an empty output draws nothing in the outline
                notice && <output className="storage-notice">{notice}</output>
            }
            {children}
        </main>
    );
}

function useMenu() {
    // Stryker disable next-line BooleanLiteral: the menu's state reaches only attributes hydration keeps as the server wrote them (the sidebar's class, and aria-expanded on a toggle hidden at the specs' desktop width)
    const [menuOpen, setMenuOpen] = useState(false);
    // Stryker disable ArrayDeclaration: the callback's dependencies, which only the effect it is handed to reads, and the server runs no effect
    useEscape(
        useCallback(() => {
            setMenuOpen(false);
        }, []),
    );
    // Stryker restore ArrayDeclaration
    return [menuOpen, setMenuOpen] as const;
}

export function CapApp({ view }: { view: string }) {
    const trigger = useRef<HTMLElement | null>(null);
    const { workspace, update, ready, notice } = useWorkspace();
    const [dialog, setDialog] = useState<DialogKind | null>(null);
    const [menuOpen, setMenuOpen] = useMenu();
    function open(kind: DialogKind) {
        trigger.current =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setDialog(kind);
    }
    return (
        <div className="app-shell">
            <a className="skip-link" href="#main">
                Skip to content
            </a>
            <TopBar
                menuOpen={menuOpen}
                onToggleMenu={() => {
                    setMenuOpen(!menuOpen);
                }}
                view={view}
                workspace={workspace}
            />
            <Sidebar
                onCheckIn={() => {
                    open('check-in');
                    setMenuOpen(false);
                }}
                open={menuOpen}
                view={view}
                workspace={workspace}
            />
            <MainContent notice={notice}>
                <CurrentView
                    onOpen={open}
                    ready={ready}
                    update={update}
                    view={view}
                    workspace={workspace}
                />
            </MainContent>
            <WorkspaceDialog
                dialog={dialog}
                onClose={() => {
                    setDialog(null);
                }}
                ready={ready}
                trigger={trigger}
                update={update}
                workspace={workspace}
            />
        </div>
    );
}
