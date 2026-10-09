import { test } from '@jterrazz/test/config';
import { defineConfig } from '@jterrazz/typescript/config';

export default defineConfig({
    kind: 'website',
    platform: 'react',
    presets: [test()],
    typescript: {
        mutation: {
            ignore: {
                'src/presentation/use-escape.ts':
                    'the keydown listener is attached in an effect, which only the browser runs, and the client bundle carries no active mutant',
                'src/presentation/workspace-dialog.tsx':
                    'the dialog renders through a portal only the browser mounts, and its handlers run there, so the server renders none of it and the client bundle carries no active mutant',
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
