import { button, content, heading } from '@jterrazz/test';
import { describe, expect, test } from 'vitest';

import { website } from '../website.specification';

describe('pairing', () => {
    test('device pairing says it is unavailable, and escape dismisses it', async () => {
        // Given - the preview has no pairing service, and the reader asks to connect a device
        const notice =
            'Mobile pairing is not available in this preview. Your habits and journal stay in this browser for now.';
        const result = await website.visit('/mobile', async (visitor) => {
            // When - they read the explanation, then press escape
            await visitor.click(button('Connect device'));
            await visitor.see(heading('A companion, in the making.'));
            await visitor.see(content(notice));
            await visitor.press('Escape');
            await visitor.gone(content(notice));
        });

        // Then - the page is back as it was, no device claimed connected
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
              - heading "Take cap01 with you." [level=1]
              - paragraph: A little perspective, wherever your day takes you.
              - button "Connect device"
              - heading "Keep your momentum" [level=2]
              - paragraph: A space for your habits, at your own pace.
              - heading "Make room for what matters" [level=2]
              - paragraph: Bring a little intention to the moments in between.
              - heading "Notice the small things" [level=2]
              - paragraph: Turn a passing thought into something to come back to.
              - paragraph: Mobile companion in development`);
        expect(result.errors.text).toBe('');
    });
});
