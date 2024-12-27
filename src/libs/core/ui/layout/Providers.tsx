'use client';

import React from 'react';
import { ProvideUsers } from '@/users';
import { ProvideProjects } from '@/projects';
import { ProvideTasks } from '@/tasks';

export const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<ProvideUsers>
			<ProvideProjects>
				<ProvideTasks>
					{children}
				</ProvideTasks>
			</ProvideProjects>
		</ProvideUsers>
	);
};
