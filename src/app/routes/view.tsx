import { useParams } from 'react-router';

import { CapApp } from '../../presentation/cap-app';

const views = new Set([
    'mobile',
    'today',
    'overview',
    'goals',
    'journal',
    'coach',
    'insights',
    'mind',
    'health',
    'work',
]);
export function loader({ params }: { params: { view?: string } }) {
    if (!params.view || !views.has(params.view)) {
        throw new Response('Not found', { status: 404 });
    }
    return null;
}
export default function WorkspaceView() {
    const { view = 'mobile' } = useParams();
    return <CapApp key={view} view={view} />;
}
