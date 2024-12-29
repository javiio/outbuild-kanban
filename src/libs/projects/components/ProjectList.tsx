'use client';

import React from 'react';
import { ProjectCard, useProjects } from '@/projects';

export const ProjectList = () => {
	const { list } = useProjects();
		
	return (
		<>
			{list.map((project) => <ProjectCard key={project.id} project={project} />)}
		</>
	);
};
