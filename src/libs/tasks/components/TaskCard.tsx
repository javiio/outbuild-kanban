import React from 'react';
import { useRightPanel } from '@/core/data';
import { Card, Colors, Text } from '@/core/ui';
import { useTask, useTasks, type Task } from '@/tasks';

interface TaskCardProps {
  task: Task | string;
	isDragging?: boolean;
};

export const TaskCard = ({ task, isDragging }: TaskCardProps) => {
  const taskActions = useTask(task);
	const { get } = useTasks();
	const { showPanel } = useRightPanel();
	const item = get(task) as Task;

  return (
		<Card
			item={get(task) as Task}
			itemActions={taskActions}
			onSelect={() => showPanel('tasks', item)}
			className="bg-gray-800"
			color={isDragging ? Colors.gray : 'yellow'}
			isDragging={isDragging}
		>
			<div className="flex">
				<Text className="flex-1">{item?.name}</Text>
			</div>
		</Card>
	);
};
