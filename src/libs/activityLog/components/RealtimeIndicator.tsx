import React from 'react';
import type { ActionType } from '@/core/data/types';
import { Icon } from '@/core/ui/components/Icon';
import { ActionTypeData } from '@/activityLog/data/types';

interface RealtimeIndicatorProps {
	actionType: ActionType;
}

export const RealtimeIndicator = ({ actionType }: RealtimeIndicatorProps) => {
	const { color, icon } = ActionTypeData[actionType];

	return (
		<div className="relative flex h-5 w-5">
			<span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-${color}-400`} />
			<span className={`relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-${color}-500`}>
				<Icon name={icon} size={4} />
			</span>
		</div>
	);
};
