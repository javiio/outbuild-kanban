import React from 'react';
import { Card, Text } from '@/core/ui';
import { useUser, ProfilePic, type User } from '@/users';
import { RealtimeActionPreview } from '@/activityLog';

interface UserProps {
	user: User;
}

export const UserCard = ({ user }: UserProps) => {
	const userActions = useUser(user);

	return (
		<Card
			item={user}
			itemActions={userActions}
			className={`${user.isOnline ? '' : 'opacity-70'}`}
			showRealtimeActions={false}
		>
			<div className="flex items-center space-x-2">
				<ProfilePic user={user} size="lg" showStatus />
				<Text className="flex-1">{user.name}</Text>
			</div>

			{user.isOnline && (
				<div className="ml-4 flex flex-col space-y-2 mt-2">
					{user.viewing && <RealtimeActionPreview action={user.viewing} />}
					{user.editing && <RealtimeActionPreview action={user.editing} />}
					{user.moving && <RealtimeActionPreview action={user.moving} />}
				</div>
			)}
		</Card>
	);
};
