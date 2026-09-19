import { button, content, field, heading, link, main, navigation, within } from '@jterrazz/test';
import { expect, test } from 'vitest';

import { website } from '../website.specification';

test('workspace navigation reaches the journal from today', async () => {
    // Given - a reader starts in the local companion's daily workspace.
    const result = await website.visit('/today', async (visitor) => {
        await visitor.see(heading('Small steps. Your pace.'));
        await visitor.click(within(navigation('Workspace'), link('Journal', { exact: true })));
        await visitor.see(field('Journal entry'));
    });
    // Then - navigation opens a usable journal rather than a placeholder link.
    expect(new URL(result.url).pathname).toBe('/journal');
    expect(result.content).toContain('Save entry');
    await expect(result.errors).toBeEmpty();
});

test('a checked habit and its daily progress survive a page reload', async () => {
    // Given - this fresh browser has no habits, and the reader adds one they can complete.
    const result = await website.visit('/today', async (visitor) => {
        await visitor.fill(field('New habit'), 'Read ten pages');
        await visitor.click(button('Add habit', { exact: true }));
        await visitor.check(field('Read ten pages', { exact: true }));
        await visitor.see(content('1 of 1 completed today', { exact: true }));
        await visitor.goto('/today');
        await visitor.see(content('1 of 1 completed today', { exact: true }));
    });
    // Then - the local habit and completion remain visible after document navigation.
    expect(result.content).toContain('Read ten pages');
    expect(result.content).toContain('1 of 1 completed today');
    await expect(result.errors).toBeEmpty();
});

test('a saved journal entry remains readable after reopening the page', async () => {
    // Given - a reader writes a reflection in an isolated browser session.
    const reflection = 'I made space for a quiet walk and came back with a clearer head.';
    const result = await website.visit('/journal', async (visitor) => {
        await visitor.fill(field('Journal entry'), reflection);
        await visitor.click(button('Save entry', { exact: true }));
        await visitor.see(within(main(), content(reflection, { exact: true })));
        await visitor.goto('/journal');
        await visitor.see(within(main(), content(reflection, { exact: true })));
    });
    // Then - saving persists the actual writing, not only a transient success message.
    expect(result.content).toContain(reflection);
    await expect(result.errors).toBeEmpty();
});

test('device pairing explains its limitation and can be dismissed with escape', async () => {
    // Given - the prototype has no mobile pairing service and the reader opens its explanation.
    const notice =
        'Mobile pairing is not available in this preview. Your habits and journal stay in this browser for now.';
    const result = await website.visit('/mobile', async (visitor) => {
        await visitor.click(button('Connect device', { exact: true }));
        await visitor.see(heading('A companion, in the making.'));
        await visitor.see(content(notice, { exact: true }));
        await visitor.press('Escape');
    });
    // Then - the dialog closes without pretending that a device was connected.
    expect(result.content).not.toContain(notice);
    expect(result.content).toContain('Connect device');
    await expect(result.errors).toBeEmpty();
});
