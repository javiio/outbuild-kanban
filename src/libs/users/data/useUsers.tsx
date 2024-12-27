'use client';
import React, {
	useContext,
	createContext,
	type ReactNode,
} from 'react';
import { useCollection, defaultCollectionContext, type CollectionContext, now } from '@/core/data';
import type { User } from '@/users';

type UserContextProps = CollectionContext<User>;

const UserContext = createContext<UserContextProps>(defaultCollectionContext);

export const ProvideUsers = ({ children }: { children: ReactNode }) => {
	const collection = useCollection<User>('users');

	const value = {
		...collection,
		selected: { id: '1', name: 'John Doe', isOnline: true, lastSeen: now(), createdAt: now() },
	}

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
};

export const useUsers = () => useContext(UserContext);
