import type { DataWithDescription } from '@/core/data';

export interface Task extends DataWithDescription {
	description: string;
	projectId: string;
	listId: string;
};
