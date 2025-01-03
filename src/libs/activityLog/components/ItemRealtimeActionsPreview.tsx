import React from 'react';
import { ActionType, type ItemActions, type Data } from '@/core/data';
import { ProfilePicList, ProfilePic } from '@/users';
import { Icon } from '@/core/ui';

interface ItemRealtimeActionsPreviewProps<T extends Data> {
	itemActions: ItemActions<T>;
	isDragging?: boolean;
}

export const ItemRealtimeActionsPreview = <T extends Data>({ itemActions, isDragging }: ItemRealtimeActionsPreviewProps<T>) => {
	const { viewers, editors, mover } = itemActions;
	const viewersNotEditing = viewers.filter((v) => !editors.find((e) => e.userId === v.userId));

	return (
		<div className="flex space-x-4">
			{viewersNotEditing.length > 0 && (
				<div className="flex items-center space-x-1">
					<Icon.Eye className="text-blue-400/50" size={4} />
					<ProfilePicList
						users={viewersNotEditing.map((u) => u.userId)}
						size="sm"
						showTooltip
					/>
				</div>
			)}
			{editors.length > 0 && (
				<div className="flex items-center space-x-1">
					<Icon.Pencil className="text-green-400/50" size={4} />
					<ProfilePicList
						users={editors.map((u) => u.userId)}
						size="sm"
						showTooltip
					/>
				</div>
			)}
			{mover && !isDragging && (
				<div className="absolute -top-4 right-2">
					<ProfilePic user={mover.userId} realtimeIndicator={ActionType.Move} showTooltip />
				</div>
			)}
		</div>
	)
};
