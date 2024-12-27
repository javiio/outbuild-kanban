import React from 'react';
import { TitleForm, Textarea } from '@/core/ui';
import { useTask, type Task } from '@/tasks';

interface TaskFormProps {
	task: Task;
};

export const TaskForm = ({ task }: TaskFormProps) => {
	const taskActions = useTask(task, { realtime: true });

	return (
		<div className="flex flex-col space-y-6">
			<TitleForm itemActions={taskActions} />
			<Textarea itemActions={taskActions} />
		</div>
	);
};
