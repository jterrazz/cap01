import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [reactRouter()],
    cacheDir: '.artifacts/vite',
    server: { port: 4320, strictPort: true },
});
