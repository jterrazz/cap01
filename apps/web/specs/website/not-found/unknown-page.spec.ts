import { describe, expect, test } from 'vitest';

import { website } from '../website.specification';

describe('unknown-page', () => {
    test('a page the workspace does not have answers 404, and says so', async () => {
        // Given - an address no view of the workspace answers
        const result = await website.visit('/elsewhere');

        // Then - the document comes back 404, and the page a reader meets says so and leads back home
        expect(result.status).toBe(404);
        expect(result.tree).toMatch(`
            - main:
              - heading "This page is not available." [level=1]
              - paragraph:
                - link "Back to cap01":
                  - /url: /`);
        expect(result.errors).toMatch(
            `Failed to load resource: the server responded with a status of 404 (Not Found)`,
        );
    });
});
