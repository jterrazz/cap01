import { useEffect, useState } from 'react';

import { emptyWorkspace, parseWorkspace } from '../domain/workspace';
import type { Workspace } from '../domain/workspace';

const key = 'cap01-workspace-v1';
export function useWorkspace() {
    const [workspace, setWorkspace] = useState<Workspace>(emptyWorkspace);
    const [ready, setReady] = useState(false);
    const [notice, setNotice] = useState('');
    useEffect(() => {
        try {
            // oxlint-disable-next-line react/set-state-in-effect -- Browser storage is an external source unavailable during SSR
            setWorkspace(parseWorkspace(localStorage.getItem(key)));
        } catch {
            setNotice(
                'Your saved workspace could not be loaded. Changes will stay in this session.',
            );
        }
        setReady(true);
    }, []);
    function update(next: Workspace) {
        setWorkspace(next);
        if (!notice) {
            try {
                localStorage.setItem(key, JSON.stringify(next));
            } catch {
                setNotice('Browser storage is unavailable. Changes will stay in this session.');
            }
        }
    }
    return { workspace, update, ready, notice };
}
