'use client';

import React, {
	useContext,
	createContext,
	type ReactNode,
} from 'react';
import { useCollection, defaultCollectionContext, type CollectionContext } from '@/core/data';
import type { User } from '@/users';

type UserContextProps = CollectionContext<User>;

const UserContext = createContext<UserContextProps>(defaultCollectionContext);

export const ProvideUsers = ({ children }: { children: ReactNode }) => {
	const collection = useCollection<User>('users');

	return (
		<UserContext.Provider value={collection}>
			{children}
		</UserContext.Provider>
	);
};

export const useUsers = () => useContext(UserContext);
