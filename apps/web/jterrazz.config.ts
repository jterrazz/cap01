import { test } from '@jterrazz/test/config';
import { defineConfig } from '@jterrazz/typescript/config';

export default defineConfig({
    kind: 'website',
    platform: 'react',
    presets: [test()],
    typescript: {
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
