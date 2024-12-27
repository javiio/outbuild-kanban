import { useDoc } from '@/core/data';
import type { Task } from '@/tasks';

export const useTask = (task: Task | string, config?: { realtime: boolean }) => {
	const taskActions = useDoc<Task>('tasks', task, config);

	return taskActions;
};
