import { useDoc } from '@/core/data';
import { Project } from '@/projects';

export const useProject = (project: Project | string, config?: { realtime: boolean }) => {
	const projectActions = useDoc<Project>('projects', project, config);

	return projectActions;
};
