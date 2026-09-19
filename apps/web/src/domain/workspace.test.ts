import { expect, test } from 'vitest';

import { parseWorkspace, toggleHabit } from './workspace';

test('completion changes only the selected day without mutating stored state', () => {
    // Given - a habit already completed yesterday
    const workspace = {
        habits: [{ id: 'one', title: 'Walk', completedDates: ['2026-09-11'] }],
        entries: [],
        goal: '',
    };
    const completed = toggleHabit(workspace, 'one', '2026-09-12');
    // Then - toggling today preserves yesterday
    expect(completed.habits).toStrictEqual([
        { id: 'one', title: 'Walk', completedDates: ['2026-09-11', '2026-09-12'] },
    ]);
    expect(toggleHabit(completed, 'one', '2026-09-12')).toStrictEqual(workspace);
    expect(workspace.habits).toStrictEqual([
        { id: 'one', title: 'Walk', completedDates: ['2026-09-11'] },
    ]);
});

test('invalid persisted entries are rejected instead of becoming a usable workspace', () => {
    // Given - malformed browser storage
    const invalid = JSON.stringify({
        habits: [],
        entries: [{ id: 'one', body: 'Hello', createdAt: 'invalid' }],
        goal: '',
    });
    // Then - loading fails explicitly while absent data has an honest empty state
    expect(() => parseWorkspace(invalid)).toThrow('Invalid journal');
    expect(parseWorkspace(null)).toStrictEqual({ habits: [], entries: [], goal: '' });
});
