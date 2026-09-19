import { index, route } from '@react-router/dev/routes';
import type { RouteConfig } from '@react-router/dev/routes';

export default [
    index('routes/workspace.tsx'),
    route(':view', 'routes/view.tsx'),
] satisfies RouteConfig;
