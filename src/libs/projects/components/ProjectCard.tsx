import React from 'react';
import { Icon, Card, Text } from '@/core/ui';
import { useProject, useProjects, type Project } from '@/projects';

interface ProjectProps {
	project: Project;
}

export const ProjectCard = ({ project }: ProjectProps) => {
	const projectActions = useProject(project);
	const { selected, setSelected } = useProjects();

	return (
		<Card
			item={project}
			itemActions={projectActions}
			isSelected={selected?.id === project.id}
			onSelect={setSelected}
			color={project.color}
			className="p-4 max-w-md min-w-96 mt-2"
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
