import type { Data } from '@/core/data';
import type { IconName, ColorName } from '@/core/ui';

export type BoardListType = Data;

export interface Project extends Data {
	description: string;
	icon: IconName;
	color: ColorName;
	lists: BoardListType[];
};
