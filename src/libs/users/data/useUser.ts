import { useDoc } from '@/core/data';
import { type User } from '@/users';

export const useUser = (user: User | string) => {
	const collectionDoc = useDoc<User>('users', user);

	return {
		...collectionDoc,
	};
};
