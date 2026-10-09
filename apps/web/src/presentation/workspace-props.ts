import type { Workspace } from '../domain/workspace';

export type WorkspaceProps = {
    ready: boolean;
    update: (next: Workspace) => void;
    workspace: Workspace;
};
