interface Habit {
    id: string;
    title: string;
    completedDates: string[];
}
interface JournalEntry {
    id: string;
    body: string;
    createdAt: string;
}
export interface Workspace {
    habits: Habit[];
    entries: JournalEntry[];
    goal: string;
}
export const emptyWorkspace: Workspace = { habits: [], entries: [], goal: '' };

/** Reject malformed local data without treating it as a valid workspace. */
export function parseWorkspace(value: null | string): Workspace {
    if (!value) {
        return { habits: [], entries: [], goal: '' };
    }
    const data: unknown = JSON.parse(value),
        workspace = data as Partial<Workspace>;
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid workspace');
    }
    if (
        !Array.isArray(workspace.habits) ||
        !Array.isArray(workspace.entries) ||
        typeof workspace.goal !== 'string'
    ) {
        throw new Error('Invalid workspace');
    }
    if (
        !workspace.habits.every(
            (habit) =>
                habit &&
                typeof habit.id === 'string' &&
                typeof habit.title === 'string' &&
                Array.isArray(habit.completedDates) &&
                habit.completedDates.every((date: unknown) => typeof date === 'string'),
        )
    ) {
        throw new Error('Invalid habits');
    }
    if (
        !workspace.entries.every(
            (entry) =>
                entry &&
                typeof entry.id === 'string' &&
                typeof entry.body === 'string' &&
                typeof entry.createdAt === 'string' &&
                !Number.isNaN(Date.parse(entry.createdAt)),
        )
    ) {
        throw new Error('Invalid journal');
    }
    return workspace as Workspace;
}

/** A completion belongs to the reader's local calendar day, not a UTC day. */
export function localDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function toggleHabit(workspace: Workspace, id: string, date: string): Workspace {
    return {
        ...workspace,
        habits: workspace.habits.map((habit) =>
            habit.id !== id
                ? habit
                : {
                      ...habit,
                      completedDates: habit.completedDates.includes(date)
                          ? habit.completedDates.filter((day) => day !== date)
                          : [...habit.completedDates, date],
                  },
        ),
    };
}
