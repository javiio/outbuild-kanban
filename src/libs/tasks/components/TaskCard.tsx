import React from 'react';
import { Card } from '@/core/ui';
import { useTask, useTasks, type Task } from '@/tasks';

interface TaskCardProps {
  task: Task | string;
	isDragging?: boolean;
};

export const TaskCard = ({ task, isDragging }: TaskCardProps) => {
  const taskActions = useTask(task);
	const { selected, setSelected, get, currentProject } = useTasks();
	const item = get(task) as Task;

  return (
		<Card
			item={item}
			itemActions={taskActions}
			isSelected={selected?.id === item.id}
			onSelect={setSelected}
			className="bg-gray-800"
			color={currentProject?.color}
			isDragging={isDragging}
		>
			<div className="flex">
				<span className="flex-1">{item.name}</span>
			</div>
		</Card>
	);
};
