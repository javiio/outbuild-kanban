import React from 'react';
import { ProfilePic, type User, type ProfilePicProps } from '@/users';

interface ProfilePicListProps extends Omit<ProfilePicProps, 'user'> {
	users: (User | string)[];
}

export const ProfilePicList = ({ users, ...props }: ProfilePicListProps) => {
	return (
		<div className="flex -space-x-1.5">
			{users.map((user) => (
				<div key={typeof user === 'string' ? user : user.id}>
					<ProfilePic user={user} {...props} />
				</div>
			))}
		</div>
	);
};
