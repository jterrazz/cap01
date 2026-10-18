import { button, content, field, main, within } from '@jterrazz/test';
import { describe, expect, test } from 'vitest';

import { website } from '../website.specification';

describe('persistence', () => {
    test('a saved journal entry is still there after the page is opened again', async () => {
        // Given - a reader writing a reflection in a fresh browser
        const reflection = 'I made space for a quiet walk and came back with a clearer head.';
        const result = await website
            .clock('2026-09-12T12:00:00Z')
            .visit('/journal', async (visitor) => {
                // When - they save it, then open the journal again
                await visitor.fill(field('Journal entry'), reflection);
                await visitor.click(button('Save entry'));
                await visitor.see(within(main(), content(reflection)));
                await visitor.goto('/journal');
                await visitor.see(within(main(), content(reflection)));
            });

        // Then - the reopened journal shows the entry, dated the day it was written
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
                - link "I made space for a quiet walk and came back with a clearer head.":
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
                - paragraph: I made space for a quiet walk and came back with a clearer head.`);
        expect(result.errors.text).toBe('');
    });
});
