/* eslint-disable @next/next/no-img-element */
import React from 'react';
import cn from 'classnames';
import { Tooltip } from '@/core/ui';
import { useUsers, type User } from '@/users';
import { RealtimeIndicator } from '@/activityLog';
import { type ActionType } from '@/core/data';

export interface ProfilePicProps {
	user: User | string;
	showTooltip?: boolean;
	showStatus?: boolean;
	realtimeIndicator?: ActionType;
	size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
	sm: 'h-6 w-6',
	md: 'h-8 w-8',
	lg: 'h-10 w-10',
}

export const ProfilePic = ({ user, showTooltip, showStatus, realtimeIndicator, size = 'md' }: ProfilePicProps) => {
	const { get } = useUsers();

	const _user = get(user) as User;
	
	return (
		<Tooltip content={_user.name} disabled={!showTooltip}>
			<div
				className={cn(
					'rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center relative text-white',
					SIZES[size],
				)}
			>
				{_user.photoURL
					? <img
							src={_user.photoURL}
							alt={_user.name}
							className={`object-cover rounded-full`}
						/>
					: _user.name.substring(0, 1).toUpperCase()
				}

				{realtimeIndicator && (
					<div className="absolute -top-2 -right-2">
						<RealtimeIndicator actionType={realtimeIndicator} />
					</div>
				)}

				{showStatus && (
					<div
						className={cn(
							'absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-800',
							_user.isOnline ? 'bg-green-400' : 'bg-gray-600'
						)}
					/>
				)}
			</div>
		</Tooltip>
	);
};
