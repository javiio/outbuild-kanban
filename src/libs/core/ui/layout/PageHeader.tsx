import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Text, Button, Icons } from '@/core/ui';
import { NewProjectModal, ProjectTabs } from '@/projects';

export const PageHeader = () => {
	const pathname = usePathname();

	return (
		<div className="h-12 px-4">
			{pathname === '/projects' && <ProjectsHeader />}
			{pathname.startsWith('/board/') && <ProjectTabs />}
		</div>
	);
};


const ProjectsHeader = () => {
	const [isNewFormOpen, setIsNewFormOpen] = useState(false);

	return (
		<div className="px-4 flex items-center space-x-12">
			<Text.H1 className="!mb-0.5">Projects</Text.H1>
			<Button
				size='sm'
				icon={Icons.Plus}
				onClick={() => setIsNewFormOpen(true)}
			>
				New
			</Button>

			<NewProjectModal
				isOpen={isNewFormOpen}
				onClose={() => setIsNewFormOpen(false)}
			/>
		</div>
	);
};
