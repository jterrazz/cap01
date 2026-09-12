import { useEffect, useState } from 'react';

import { emptyWorkspace, parseWorkspace, type Workspace } from '../domain/workspace';

const key = 'cap01-workspace-v1';
export function useWorkspace() {
    const [workspace, setWorkspace] = useState<Workspace>(emptyWorkspace),
        [ready, setReady] = useState(false),
        [notice, setNotice] = useState('');
    useEffect(() => {
        try {
            // Browser storage is an external source unavailable during SSR.
            // eslint-disable-next-line react/set-state-in-effect
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
