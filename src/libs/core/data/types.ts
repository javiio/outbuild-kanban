import { type Timestamp as TimestampFb } from 'firebase/firestore';

export type Timestamp = TimestampFb;

export interface Data {
	id: string;
	name: string;
  createdAt?: Timestamp;
}

export enum ActionType {
  View = 'view',
  Edit = 'edit',
  Move = 'move',
}

export type RealtimeAction = {
  userId: string;
  collectionName: string;
  itemId: string;
  action: ActionType;
  field?: string;
  startedAt?: Timestamp;
};

export type RealtimeItemTracking = {
  viewers: RealtimeAction[];
  editing: RealtimeAction[];
  moving?: RealtimeAction | null;
}

export interface CollectionContext<T extends Data> {
  name: string;
  list: T[];
  add: (item: Partial<T>) => Promise<void>;
  update: (itemId: string, attrs: Partial<T>) => Promise<void>;
  selected: T | undefined;
  setSelected: (item: T | undefined) => void;
  get: (itemId: T | string) => T | undefined;
  isLoading: boolean;
};

export interface ItemActions<T extends Data> {
	item?: T;
	update: (attrs: Partial<T>) => Promise<void>;
  remove: () => Promise<void>;
	viewers: RealtimeAction[];
  editors: RealtimeAction[];
  mover?: RealtimeAction | null;
	view: () => Promise<void>;
  startEditing: (field: string) => Promise<void>;
  finishEditing: () => Promise<void>;
  startMoving: () => Promise<void>;
  finishMoving: () => Promise<void>;
	isLoading: boolean;
};
