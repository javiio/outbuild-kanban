import type { Data, RealtimeAction, Timestamp } from '@/core/data';

export interface User extends Data {
  photoURL?: string;
	isOnline: boolean;
	lastSeen?: Timestamp;
  viewing?: RealtimeAction | null;
  editing?: RealtimeAction | null;
  moving?: RealtimeAction | null;
}
