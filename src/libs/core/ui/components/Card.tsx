import React from 'react';
import cn from 'classnames';
import { useRightPanel, type ItemActions, type Data } from '@/core/data';
import type { ColorName } from '@/core/ui';
import { ItemRealtimeActionsPreview } from '@/activityLog';

interface CardProps<T extends Data> {
	item: T;
	itemActions: ItemActions<T>;
	color?: ColorName;
	onSelect?: (item: T) => void;
	className?: string;
	isDragging?: boolean;
	showRealtimeActions?: boolean;
	children: React.ReactNode;
}

export const Card = <T extends Data>({ item, itemActions, onSelect, color, className, isDragging, showRealtimeActions = true, children }: CardProps<T>) => {
	const { showing } = useRightPanel();
	const isSelected = showing?.item.id === item?.id;
	const containerClasses = cn(
		'relative border p-2 rounded-md transition-all hover:bg-opacity-80',
		color && !isSelected ? `hover:border-${color}-500/50` : '',
		isSelected ? `border-${color}-500` : 'border-transparent',
		className
	);

	return (
		<div
			className={containerClasses}
			onClick={onSelect ? () => onSelect(item) : undefined}
		>
			{children}

			{showRealtimeActions && (
				<div className="mt-4">
					<ItemRealtimeActionsPreview itemActions={itemActions} isDragging={isDragging} />
				</div>
			)}
		</div>
	);
};
