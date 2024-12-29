'use client';

import React from 'react';
import { ProvideRightPanel } from '@/core/data';
import { ProvideUsers } from '@/users';
import { ProvideProjects } from '@/projects';
import { ProvideTasks } from '@/tasks';
import { ProvideAuth, AuthRedirect } from '@/auth';

export const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<ProvideUsers>
			<ProvideAuth>
				<ProvideProjects>
					<AuthRedirect>
						<ProvideTasks>
							<ProvideRightPanel>
								{children}
							</ProvideRightPanel>
						</ProvideTasks>
					</AuthRedirect>
				</ProvideProjects>
			</ProvideAuth>
		</ProvideUsers>
	);
};
