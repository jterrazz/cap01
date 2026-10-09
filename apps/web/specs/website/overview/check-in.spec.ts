import { button, field, main, within } from '@jterrazz/test';
import { describe, expect, test } from 'vitest';

import { website } from '../website.specification';

describe('check-in', () => {
    test('a check-in written from the overview lands in the journal as its newest entry', async () => {
        // Given - a reader on the overview of a fresh browser
        const result = await website
            .clock('2026-09-12T12:00:00Z')
            .visit('/overview', async (visitor) => {
                // When - they open a check-in, write a few words and save them
                await visitor.click(within(main(), button('New check-in')));
                await visitor.fill(field('Your check-in'), 'Rested, a little slow to start.');
                await visitor.click(button('Save check-in'));
                await visitor.gone(field('Your check-in'));
            });

        // Then - the dialog is gone, the overview counts one thought kept, and the entry leads the recents
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
              - text: c Personal space Local preview
            - main:
              - paragraph: Overview
              - heading "A little more intentional." [level=1]
              - paragraph: A quiet place to reflect, build habits and find your next step.
              - button "New check-in"
              - link "Habits you are building 0":
                - /url: /today
                - text: Habits you are building
                - strong: "0"
              - link "Thoughts you have kept 1":
                - /url: /journal
                - text: Thoughts you have kept
                - strong: "1"
              - link "Find your next direction":
                - /url: /goals
              - paragraph: This preview keeps your notes in this browser. AI coaching is not connected yet.`);
        expect(result.errors.text).toBe('');
    });
});
