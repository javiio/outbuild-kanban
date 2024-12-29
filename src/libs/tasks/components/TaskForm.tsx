import React, { useEffect } from 'react';
import { TitleForm, Textarea, Text } from '@/core/ui';
import { useTask, type Task } from '@/tasks';

interface TaskFormProps {
	task: Task;
};

export const TaskForm = ({ task }: TaskFormProps) => {
	const taskActions = useTask(task, { realtime: true });

	useEffect(() => {
		taskActions.view();
		const unload = () => {
			taskActions.unview();
		};
		return unload;
	}, []);

	if (!taskActions.item && !taskActions.isLoading) {
		return (
			<>
				<Text.H2>ERROR</Text.H2>
				<Text>Task not found. Maybe it was deleted by someone else.</Text>
			</>
		);
	}

	return (
		<div className="flex flex-col space-y-6">
			<TitleForm itemActions={taskActions} />
			<Textarea itemActions={taskActions} />
		</div>
	);
};
