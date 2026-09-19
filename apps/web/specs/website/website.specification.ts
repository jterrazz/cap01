import { specification } from '@jterrazz/test';
import { afterAll } from 'vitest';

const { website, cleanup } = await specification.website({
    server: { command: 'npm run start', ready: '/today', timeout: 60_000 },
});

afterAll(cleanup);

export { website };
