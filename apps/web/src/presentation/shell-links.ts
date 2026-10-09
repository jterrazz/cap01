import {
    BookOpen,
    ChartNoAxesCombined,
    Circle,
    Compass,
    NotebookPen,
    Smartphone,
    Sparkles,
    Target,
} from 'lucide-react';

export const workspaceLinks = [
    { href: '/overview', label: 'Overview', icon: Compass },
    { href: '/today', label: 'Habits', icon: Circle },
    { href: '/goals', label: 'Goals', icon: Target },
    { href: '/journal', label: 'Journal', icon: NotebookPen },
    { href: '/mobile', label: 'Mobile', icon: Smartphone },
];

export const areaLinks = [
    { href: '/mind', label: 'Mind & focus' },
    { href: '/health', label: 'Health & energy' },
    { href: '/work', label: 'Work & craft' },
];

export const mainTabs = [
    { href: '/coach', label: 'Coach', icon: Sparkles },
    { href: '/today', label: 'Today', icon: Compass },
    { href: '/journal', label: 'Journal', icon: BookOpen },
    { href: '/insights', label: 'Insights', icon: ChartNoAxesCombined },
];
