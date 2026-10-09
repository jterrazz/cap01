import { describe, expect, test } from 'vitest';

import { website } from '../website.specification';

describe('outline', () => {
    test('the insights page says what it is and leads into the shared workspace', async () => {
        // Given - a reader opening /insights
        const result = await website.visit('/insights');

        // Then - its outline is the page a reader meets
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
              - paragraph: Insights
              - heading "Notice what is taking shape." [level=1]
              - paragraph: A quiet place to reflect, build habits and find your next step.
              - button "New check-in"
              - link "Habits you are building 0":
                - /url: /today
                - text: Habits you are building
                - strong: "0"
              - link "Thoughts you have kept 0":
                - /url: /journal
                - text: Thoughts you have kept
                - strong: "0"
              - link "Find your next direction":
                - /url: /goals
              - paragraph: This preview keeps your notes in this browser. AI coaching is not connected yet.`);
        expect(result.errors.text).toBe('');
    });
});
