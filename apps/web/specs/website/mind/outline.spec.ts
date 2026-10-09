import { describe, expect, test } from 'vitest';

import { website } from '../website.specification';

describe('outline', () => {
    test('the mind page says what it is and leads into the shared workspace', async () => {
        // Given - a reader opening /mind
        const result = await website.visit('/mind');

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
              - heading "Mind & focus" [level=1]
              - paragraph: Make space for this part of your life.
              - link "Build a small habit":
                - /url: /today
              - link "Write a reflection":
                - /url: /journal
              - link "Set an intention":
                - /url: /goals
              - paragraph: Area-specific organization is coming. Your entries currently share one personal workspace.`);
        expect(result.errors.text).toBe('');
    });
});
