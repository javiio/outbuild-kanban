import type { Data } from '@/core/data';

export interface Task extends Data {
	description: string;
	projectId: string;
	listId: string;
};
