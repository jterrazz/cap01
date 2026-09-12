import { defineSpecConfig } from '@jterrazz/test/vitest';

export default defineSpecConfig({
    test: {
        projects: [
            { test: { name: 'unit', include: ['src/**/*.test.ts'] } },
            {
                test: {
                    name: 'website',
                    include: ['specs/website/**/*.test.ts'],
                    fileParallelism: false,
                    testTimeout: 60_000,
                },
            },
        ],
    },
});
