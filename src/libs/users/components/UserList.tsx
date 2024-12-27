import React from 'react';
import { Icon, Text } from '@/core/ui';
import { useUsers, UserCard } from '@/users';

export const UserList = () => {
	const { list } = useUsers();

	return (
		<div className="p-4">
			<div className="flex space-x-2 text-green-100">
				<Icon.Users className="mt-1.5" size={4} />
				<Text.H3>Members</Text.H3>
			</div>

			<div className="h-[1px] w-20 bg-gradient-to-r from-green-100 opacity-70" />

			{list.map((user) => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	);
};
