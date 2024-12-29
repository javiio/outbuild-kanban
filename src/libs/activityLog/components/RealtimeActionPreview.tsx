import React from 'react';
import { useRightPanel, type RealtimeAction } from '@/core/data';
import { Button, Text } from '@/core/ui';
import { RealtimeIndicator } from './RealtimeIndicator';
import { useProjects } from '@/projects';
import { useTasks } from '@/tasks';

interface RealtimeActionPreviewProps {
	action: RealtimeAction;
}

export const RealtimeActionPreview = ({ action }: RealtimeActionPreviewProps) => {
	const { get: getProject } = useProjects();
	const { get: getTask } = useTasks();
	const { showPanel } = useRightPanel();
	const item = action.collectionName === 'projects' ? getProject(action.itemId) : getTask(action.itemId);

	const handleSelectItem = () => {
		showPanel(action.collectionName as 'projects' | 'tasks', item);
	}

	return (
		<div className="flex space-x-3 items-center">
			<RealtimeIndicator actionType={action.action} />
			<div className="flex-1">
				<Button
					variant='link'
					onClick={handleSelectItem}
					className="!px-2 !py-1 !min-w-0 text-white hover:underline text-left"
				>
					{item?.name.substring(0, 19)}
				</Button>
			</div>
			<Text className="text-xs bg-slate-700 px-1 py-0.5 rounded">{action.collectionName.substring(0, 4).toUpperCase()}</Text>
		</div>
	)
};
