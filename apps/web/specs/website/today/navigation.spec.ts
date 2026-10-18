import { field, heading, link, navigation, within } from '@jterrazz/test';
import { describe, expect, test } from 'vitest';

import { website } from '../website.specification';

describe('navigation', () => {
    test('the workspace navigation leads from today to a journal ready to write in', async () => {
        // Given - a reader starts in the daily workspace
        const result = await website
            .clock('2026-09-12T12:00:00Z')
            .visit('/today', async (visitor) => {
                // When - they follow the journal link of the workspace navigation
                await visitor.see(heading('Small steps. Your pace.'));
                await visitor.click(within(navigation('Workspace'), link('Journal')));
                await visitor.see(field('Journal entry'));
            });

        // Then - the journal page answers, its form ready, and the console stays quiet
        expect(new URL(result.url).pathname).toBe('/journal');
        expect(result.tree).toMatch(`
            - link "Skip to content":
              - /url: "#main"
            - banner:
              - link "cap01 home":
                - /url: /
              - navigation "Main":
                - link "Coach":
                  - /url: /coach
                - link "Today":
                  - /url: /today
                - link "Journal":
                  - /url: /journal
                - link "Insights":
                  - /url: /insights
              - textbox "Search workspace":
                - /placeholder: Search
            - complementary:
              - navigation "Workspace":
                - button "New check-in"
                - link "Overview":
                  - /url: /overview
                - link "Habits":
                  - /url: /today
                - link "Goals":
                  - /url: /goals
                - link "Journal":
                  - /url: /journal
                - link "Mobile":
                  - /url: /mobile
              - heading "Your areas" [level=2]
              - navigation "Your areas":
                - link "Mind & focus":
                  - /url: /mind
                - link "Health & energy":
                  - /url: /health
                - link "Work & craft":
                  - /url: /work
              - heading "Recents" [level=2]
              - paragraph: Your next chapter starts here.
              - text: c Personal space Local preview
            - main:
              - paragraph: Journal
              - heading "A little room to think." [level=1]
              - paragraph: What is on your mind today?
              - text: Journal entry
              - textbox "Journal entry":
                - /placeholder: Start anywhere...
              - button "Save entry"`);
        expect(result.errors.text).toBe('');
    });
});
