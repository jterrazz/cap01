import { button, content, field } from '@jterrazz/test';
import { describe, expect, test } from 'vitest';

import { website } from '../website.specification';

describe('intention', () => {
    test('a saved intention is the one the goals page holds when it is opened again', async () => {
        // Given - a reader setting their first intention
        const result = await website.visit('/goals', async (visitor) => {
            // When - they save it, then open the goals page again
            await visitor.fill(field('What are you working towards?'), '  Sleep before midnight  ');
            await visitor.click(button('Save intention'));
            await visitor.see(content('Intention saved'));
            await visitor.goto('/goals');
            await visitor.see(field('What are you working towards?'));
        });

        // Then - the reopened page holds the intention, trimmed
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
              - paragraph: Goals
              - heading "Give your days a direction." [level=1]
              - paragraph: One meaningful intention is a good place to begin.
              - text: What are you working towards?
              - textbox "What are you working towards?": Sleep before midnight
              - button "Save intention"`);
        expect(result.errors.text).toBe('');
    });
});
