import React from 'react';
import { Card, Text } from '@/core/ui';
import { useUser, ProfilePic, type User } from '@/users';

interface UserProps {
	user: User;
}

export const UserCard = ({ user }: UserProps) => {
	const userActions = useUser(user);

	return (
		<Card
			item={user}
			itemActions={userActions}
			className={`mt-2 px-3 py-1 flex items-center space-x-2 cursor-default rounded hover:bg-slate-900/30 group ${user.isOnline ? '' : 'opacity-70'}`}
		>
			<ProfilePic user={user} size="lg" showStatus />
			<Text className="flex-1">{user.name}</Text>
		</Card>
	);
};
