type Habit = {
    id: string;
    title: string;
    completedDates: string[];
};
type JournalEntry = {
    id: string;
    body: string;
    createdAt: string;
};
export type Workspace = {
    habits: Habit[];
    entries: JournalEntry[];
    goal: string;
};
export const emptyWorkspace: Workspace = { habits: [], entries: [], goal: '' };

function isHabit(value: unknown): value is Habit {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        typeof value.id === 'string' &&
        'title' in value &&
        typeof value.title === 'string' &&
        'completedDates' in value &&
        Array.isArray(value.completedDates) &&
        value.completedDates.every((date: unknown) => typeof date === 'string')
    );
}

function isJournalEntry(value: unknown): value is JournalEntry {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        typeof value.id === 'string' &&
        'body' in value &&
        typeof value.body === 'string' &&
        'createdAt' in value &&
        typeof value.createdAt === 'string' &&
        !Number.isNaN(Date.parse(value.createdAt))
    );
}

type PersistedWorkspace = {
    habits: unknown[];
    entries: unknown[];
    goal: string;
};

function hasWorkspaceShape(value: unknown): value is PersistedWorkspace {
    return (
        typeof value === 'object' &&
        value !== null &&
        'habits' in value &&
        Array.isArray(value.habits) &&
        'entries' in value &&
        Array.isArray(value.entries) &&
        'goal' in value &&
        typeof value.goal === 'string'
    );
}

/** Reject malformed local data without treating it as a valid workspace. */
export function parseWorkspace(value: null | string): Workspace {
    if (value === null || value === '') {
        return { habits: [], entries: [], goal: '' };
    }
    const data: unknown = JSON.parse(value);
    if (!hasWorkspaceShape(data)) {
        throw new TypeError('Invalid workspace');
    }
    const { habits, entries, goal } = data;
    if (!habits.every(isHabit)) {
        throw new Error('Invalid habits');
    }
    if (!entries.every(isJournalEntry)) {
        throw new Error('Invalid journal');
    }
    return { habits, entries, goal };
}

/** A completion belongs to the reader's local calendar day, not a UTC day. */
export function localDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function toggleHabit(workspace: Workspace, id: string, date: string): Workspace {
    return {
        ...workspace,
        habits: workspace.habits.map((habit) =>
            habit.id === id
                ? {
                      ...habit,
                      completedDates: habit.completedDates.includes(date)
                          ? habit.completedDates.filter((day) => day !== date)
                          : [...habit.completedDates, date],
                  }
                : habit,
        ),
    };
}
