import {
    Close as DialogClose,
    Content as DialogContent,
    Description as DialogDescription,
    Overlay as DialogOverlay,
    Portal as DialogPortal,
    Root as DialogRoot,
    Title as DialogTitle,
} from '@radix-ui/react-dialog';
import { Leaf, Smartphone, X } from 'lucide-react';
import { useState } from 'react';
import type { RefObject } from 'react';

import type { WorkspaceProps } from './workspace-props';

export type DialogKind = 'check-in' | 'device';

function DeviceNotice() {
    return (
        <>
            <Smartphone aria-hidden="true" className="dialog-symbol" size={28} />
            <DialogTitle>A companion, in the making.</DialogTitle>
            <DialogDescription>
                Mobile pairing is not available in this preview. Your habits and journal stay in
                this browser for now.
            </DialogDescription>
            <DialogClose className="primary-button">Got it</DialogClose>
        </>
    );
}

type CheckInProps = {
    draft: string;
    onDraft: (draft: string) => void;
    onSave: (body: string) => void;
    ready: boolean;
};

function CheckIn({ draft, onDraft, onSave, ready }: CheckInProps) {
    return (
        <>
            <Leaf aria-hidden="true" className="dialog-symbol" size={26} />
            <DialogTitle>How are you arriving today?</DialogTitle>
            <DialogDescription>
                A few words are enough. This check-in goes into your journal.
            </DialogDescription>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if (draft.trim()) {
                        onSave(draft.trim());
                    }
                }}
            >
                <label className="visually-hidden" htmlFor="check-in">
                    Your check-in
                </label>
                <textarea
                    id="check-in"
                    maxLength={10_000}
                    onChange={(event) => {
                        onDraft(event.target.value);
                    }}
                    placeholder="Right now, I'm feeling..."
                    required
                    rows={4}
                    value={draft}
                />
                <button className="primary-button" disabled={!ready} type="submit">
                    Save check-in
                </button>
            </form>
        </>
    );
}

function restoreFocus(trigger: HTMLElement | null) {
    if (trigger?.isConnected === true && trigger.getClientRects().length > 0) {
        trigger.focus();
    } else {
        document.querySelector<HTMLElement>('.menu-toggle')?.focus();
    }
}

type WorkspaceDialogProps = WorkspaceProps & {
    dialog: DialogKind | null;
    onClose: () => void;
    trigger: RefObject<HTMLElement | null>;
};

export function WorkspaceDialog({
    dialog,
    onClose,
    ready,
    trigger,
    update,
    workspace,
}: WorkspaceDialogProps) {
    const [draft, setDraft] = useState('');
    function save(body: string) {
        const entry = { id: crypto.randomUUID(), body, createdAt: new Date().toISOString() };
        update({ ...workspace, entries: [entry, ...workspace.entries] });
        setDraft('');
        onClose();
    }
    return (
        <DialogRoot
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
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
                        restoreFocus(trigger.current);
                    }}
                >
                    <DialogClose aria-label="Close dialog" className="dialog-close icon-button">
                        <X size={16} />
                    </DialogClose>
                    {dialog === 'device' ? (
                        <DeviceNotice />
                    ) : (
                        <CheckIn draft={draft} onDraft={setDraft} onSave={save} ready={ready} />
                    )}
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
    );
}
