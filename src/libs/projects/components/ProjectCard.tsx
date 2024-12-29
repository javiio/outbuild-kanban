import React from 'react';
import { useRightPanel } from '@/core/data';
import { Icon, Card, Text } from '@/core/ui';
import { useProject, type Project } from '@/projects';

interface ProjectProps {
	project: Project;
}

export const ProjectCard = ({ project }: ProjectProps) => {
	const projectActions = useProject(project);
	const { showPanel } = useRightPanel();

	return (
		<Card
			item={project}
			itemActions={projectActions}
			onSelect={() => showPanel('projects', project)}
			color={project.color}
			className="p-4 max-w-md min-w-96 mt-2 hover:bg-slate-950/20"
		>
			<div className="flex space-x-4">
				<Icon name={project.icon} color={project.color} size={6} className="mt-1" />
				<Text.H2 className="flex-1">{project.name}</Text.H2>
			</div>
			<div className={`w-20 h-0.5 mt-1 mb-2 bg-${project.color}-500`} />

			<span>{project.description}</span>
		</Card>
	);
};
