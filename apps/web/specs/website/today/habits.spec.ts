import { button, content, field } from '@jterrazz/test';
import { describe, expect, test } from 'vitest';

import { website } from '../website.specification';

describe('habits', () => {
    test('a habit checked today, and the day it counts toward, survive a reload', async () => {
        // Given - a fresh browser holding no habit
        const result = await website
            .clock('2026-09-12T12:00:00Z')
            .visit('/today', async (visitor) => {
                // When - the reader adds a habit, checks it, then reloads the page
                await visitor.fill(field('New habit'), 'Read ten pages');
                await visitor.click(button('Add habit'));
                await visitor.check(field('Read ten pages'));
                await visitor.see(content('1 of 1 completed today'));
                await visitor.goto('/today');
                await visitor.see(content('1 of 1 completed today'));
            });

        // Then - the reloaded page still lists the habit, checked, and counts it done today
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
              - paragraph: Today
              - heading "Small steps. Your pace." [level=1]
              - paragraph: Choose something worth showing up for.
              - text: New habit
              - textbox "New habit":
                - /placeholder: A small daily habit…
              - button "Add habit"
              - paragraph: 1 of 1 completed today
              - checkbox "Read ten pages" [checked]
              - text: Read ten pages`);
        expect(result.errors.text).toBe('');
    });
});
