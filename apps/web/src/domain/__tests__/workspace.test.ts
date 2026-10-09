import { describe, expect, test } from 'vitest';

import { localDate, parseWorkspace, toggleHabit } from '../workspace';

const walk = { id: 'walk', title: 'Walk', completedDates: ['2026-09-11'] };
const read = { id: 'read', title: 'Read', completedDates: [] };
const entry = { id: 'one', body: 'Hello', createdAt: '2026-09-12T08:00:00.000Z' };

describe('workspace', () => {
    test('a completion toggles only the habit and the day it names, leaving the stored state as it was', () => {
        // Given - two habits, one already completed yesterday
        const workspace = { habits: [walk, read], entries: [], goal: '' };

        // When - today is toggled on the first habit, then toggled again
        const completed = toggleHabit(workspace, 'walk', '2026-09-12');

        // Then - only that habit gains today, a second toggle restores it, and the input is untouched
        expect(completed).toStrictEqual({
            habits: [{ ...walk, completedDates: ['2026-09-11', '2026-09-12'] }, read],
            entries: [],
            goal: '',
        });
        expect(toggleHabit(completed, 'walk', '2026-09-12')).toStrictEqual(workspace);
        expect(workspace.habits).toStrictEqual([walk, read]);
    });

    test.each([
        { label: 'nothing stored', stored: null },
        { label: 'an empty string', stored: '' },
    ])(
        // Given - $label in browser storage
        // Then - the workspace is the honest empty one
        'reads $label as an empty workspace',
        ({ stored }) => {
            expect(parseWorkspace(stored)).toStrictEqual({ habits: [], entries: [], goal: '' });
        },
    );

    test('a stored workspace is read back as exactly its habits, entries and goal', () => {
        // Given - a valid stored document carrying a key the workspace does not know
        const stored = JSON.stringify({
            habits: [walk],
            entries: [entry],
            goal: 'Sleep earlier',
            theme: 'dark',
        });

        // Then - the three fields come back, the unknown key does not
        expect(parseWorkspace(stored)).toStrictEqual({
            habits: [walk],
            entries: [entry],
            goal: 'Sleep earlier',
        });
    });

    test.each([
        { label: 'a number', stored: 42, error: new TypeError('Invalid workspace') },
        { label: 'null', stored: null, error: new TypeError('Invalid workspace') },
        {
            label: 'no habits',
            stored: { entries: [], goal: '' },
            error: new TypeError('Invalid workspace'),
        },
        {
            label: 'habits not a list',
            stored: { habits: {}, entries: [], goal: '' },
            error: new TypeError('Invalid workspace'),
        },
        {
            label: 'no entries',
            stored: { habits: [], goal: '' },
            error: new TypeError('Invalid workspace'),
        },
        {
            label: 'entries not a list',
            stored: { habits: [], entries: 'x', goal: '' },
            error: new TypeError('Invalid workspace'),
        },
        {
            label: 'no goal',
            stored: { habits: [], entries: [] },
            error: new TypeError('Invalid workspace'),
        },
        {
            label: 'a goal not a string',
            stored: { habits: [], entries: [], goal: 1 },
            error: new TypeError('Invalid workspace'),
        },
        {
            label: 'a broken habit after a valid one',
            stored: { habits: [walk, null], entries: [], goal: '' },
            error: new Error('Invalid habits'),
        },
        {
            label: 'a habit that is null',
            stored: { habits: [null], entries: [], goal: '' },
            error: new Error('Invalid habits'),
        },
        {
            label: 'a habit that is text',
            stored: { habits: ['walk'], entries: [], goal: '' },
            error: new Error('Invalid habits'),
        },
        {
            label: 'a habit with no id',
            stored: { habits: [{ title: 'Walk', completedDates: [] }], entries: [], goal: '' },
            error: new Error('Invalid habits'),
        },
        {
            label: 'a habit id not a string',
            stored: { habits: [{ ...walk, id: 1 }], entries: [], goal: '' },
            error: new Error('Invalid habits'),
        },
        {
            label: 'a habit with no title',
            stored: { habits: [{ id: 'walk', completedDates: [] }], entries: [], goal: '' },
            error: new Error('Invalid habits'),
        },
        {
            label: 'a habit title not a string',
            stored: { habits: [{ ...walk, title: 1 }], entries: [], goal: '' },
            error: new Error('Invalid habits'),
        },
        {
            label: 'a habit with no completions',
            stored: { habits: [{ id: 'walk', title: 'Walk' }], entries: [], goal: '' },
            error: new Error('Invalid habits'),
        },
        {
            label: 'completions not a list',
            stored: { habits: [{ ...walk, completedDates: '2026-09-11' }], entries: [], goal: '' },
            error: new Error('Invalid habits'),
        },
        {
            label: 'a completion not a string',
            stored: {
                habits: [{ ...walk, completedDates: ['2026-09-11', 1] }],
                entries: [],
                goal: '',
            },
            error: new Error('Invalid habits'),
        },
        {
            label: 'a broken entry after a valid one',
            stored: { habits: [], entries: [entry, null], goal: '' },
            error: new Error('Invalid journal'),
        },
        {
            label: 'an entry that is null',
            stored: { habits: [], entries: [null], goal: '' },
            error: new Error('Invalid journal'),
        },
        {
            label: 'an entry that is text',
            stored: { habits: [], entries: ['Hello'], goal: '' },
            error: new Error('Invalid journal'),
        },
        {
            label: 'an entry with no id',
            stored: {
                habits: [],
                entries: [{ body: 'Hello', createdAt: entry.createdAt }],
                goal: '',
            },
            error: new Error('Invalid journal'),
        },
        {
            label: 'an entry id not a string',
            stored: { habits: [], entries: [{ ...entry, id: 1 }], goal: '' },
            error: new Error('Invalid journal'),
        },
        {
            label: 'an entry with no body',
            stored: { habits: [], entries: [{ id: 'one', createdAt: entry.createdAt }], goal: '' },
            error: new Error('Invalid journal'),
        },
        {
            label: 'an entry body not a string',
            stored: { habits: [], entries: [{ ...entry, body: 1 }], goal: '' },
            error: new Error('Invalid journal'),
        },
        {
            label: 'an entry with no date',
            stored: { habits: [], entries: [{ id: 'one', body: 'Hello' }], goal: '' },
            error: new Error('Invalid journal'),
        },
        {
            label: 'an entry date not a string',
            stored: { habits: [], entries: [{ ...entry, createdAt: 1 }], goal: '' },
            error: new Error('Invalid journal'),
        },
        {
            label: 'an entry date no calendar reads',
            stored: { habits: [], entries: [{ ...entry, createdAt: 'invalid' }], goal: '' },
            error: new Error('Invalid journal'),
        },
    ])(
        // Given - stored data holding $label
        // Then - reading it fails with the part it found broken, never a usable workspace
        'refuses $label',
        ({ stored, error }) => {
            expect(() => parseWorkspace(JSON.stringify(stored))).toThrow(error);
        },
    );

    test('refuses stored text that is not JSON', () => {
        // Given - storage holding a document cut short, the likeliest real corruption
        const stored = '{"habits": [';

        // Then - the read fails on the text itself, before any shape is judged
        expect(() => parseWorkspace(stored)).toThrow(SyntaxError);
    });

    test.each([
        {
            label: 'a single-digit month and day',
            date: new Date(2026, 0, 5, 23, 30),
            expected: '2026-01-05',
        },
        {
            label: 'a two-digit month and day',
            date: new Date(2026, 10, 25, 0, 15),
            expected: '2026-11-25',
        },
    ])(
        // Given - a local time on $label
        // Then - the completion day is that local calendar day, padded
        'names the local day of $label',
        ({ date, expected }) => {
            expect(localDate(date)).toBe(expected);
        },
    );
});
