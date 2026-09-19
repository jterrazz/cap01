import { testing } from '@jterrazz/test/oxlint';
import { compose, defineConfig, react } from '@jterrazz/typescript/oxlint';

export default defineConfig({
    extends: [compose(react, testing)],
    ignorePatterns: ['.react-router/**'],
});
