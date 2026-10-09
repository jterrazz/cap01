import { useEffect } from 'react';

export function useEscape(onEscape: () => void) {
    useEffect(() => {
        function dismiss(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onEscape();
            }
        }
        globalThis.addEventListener('keydown', dismiss);
        return () => {
            globalThis.removeEventListener('keydown', dismiss);
        };
    }, [onEscape]);
}
