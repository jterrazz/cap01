import { test } from '@jterrazz/test/config';
import { defineConfig } from '@jterrazz/typescript/config';

export default defineConfig({
    kind: 'website',
    platform: 'react',
    presets: [test()],
    typescript: {
        mutation: {
            ignore: {
                'src/presentation/**':
                    'the workspace hydrates: what the server renders here is replaced or kept by the client bundle, which runs no mutant, and the specs read the hydrated page, so a server-side mutant is seen by no run (51 survived, 139 ran only in the browser); the website specs prove these views, unmeasured',
            },
        },
        tsconfig: {
            compilerOptions: {
                rootDirs: ['.', './.react-router/types'],
                types: ['node', 'vite/client'],
            },
            include: ['.react-router/types/**/*'],
            reason: 'React Router types each route module from the `+types` files its typegen writes under `.react-router/types`, read beside the routes through rootDirs; the server modules read Node and the stylesheet import reads Vite',
        },
    },
});
