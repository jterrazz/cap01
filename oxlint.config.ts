import { testing } from '@jterrazz/test/oxlint';
import { compose, defineConfig, node } from '@jterrazz/typescript/oxlint';

export default defineConfig({
    extends: [compose(node, testing)],
    plugins: ['react'],
    ignorePatterns: ['.react-router/**'],
    rules: {
        'codestyle/imports-with-ext': 'off',
        'codestyle/imports-without-ext': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-boolean-value': 'off',
        'react/jsx-handler-names': 'off',
        'react/jsx-curly-brace-presence': 'off',
        'react/jsx-max-depth': 'off',
        'unicorn/no-nested-ternary': 'off',
        'no-nested-ternary': 'off',
        'oxc/no-map-spread': 'off',
        'unicorn/prefer-global-this': 'off',
    },
});
