import { button, complementary, content, field, link, main, within } from '@jterrazz/test';
import { describe, expect, test } from 'vitest';

import { website } from '../website.specification';

describe('check-in', () => {
    test('a check-in written from the overview lands in the journal as its newest entry', async () => {
        // Given - a reader whose journal already holds one entry
        const checkIn = 'Rested, a little slow to start.';
        const result = await website
            .clock('2026-09-12T12:00:00Z')
            .visit('/journal', async (visitor) => {
                await visitor.fill(field('Journal entry'), 'An older thought.');
                await visitor.click(button('Save entry'));
                await visitor.see(within(main(), content('An older thought.')));

                // When - they write a check-in from the overview, then follow it from the recents
                await visitor.goto('/overview');
                await visitor.click(within(main(), button('New check-in')));
                await visitor.fill(field('Your check-in'), checkIn);
                await visitor.click(button('Save check-in'));
                await visitor.gone(field('Your check-in'));
                await visitor.click(within(complementary(), link(checkIn)));
                await visitor.see(within(main(), content(checkIn)));
            });

        // Then - the journal opens with the check-in first, above the older entry, and the recents lead with it
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
              - navigation "Recent entries":
                - link "Rested, a little slow to start.":
                  - /url: /journal#{{uuid}}
                - link "An older thought.":
                  - /url: /journal#{{uuid}}
              - text: c Personal space Local preview
            - main:
              - paragraph: Journal
              - heading "A little room to think." [level=1]
              - paragraph: What is on your mind today?
              - text: Journal entry
              - textbox "Journal entry":
                - /placeholder: Start anywhere...
              - button "Save entry"
              - article:
                - time: Sep 12, 2026
                - paragraph: Rested, a little slow to start.
              - article:
                - time: Sep 12, 2026
                - paragraph: An older thought.`);
        expect(result.errors.text).toBe('');
    });
});
