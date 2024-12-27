import React from 'react';
import cn from 'classnames';
import type { ItemActions, Data } from '@/core/data';
import type { ColorName } from '@/core/ui';
import { ItemRealtimeActionsPreview } from '@/activityLog';

interface CardProps<T extends Data> {
	item: T;
	itemActions: ItemActions<T>;
	color?: ColorName;
	onSelect?: (item: T) => void;
	isSelected?: boolean;
	className?: string;
	isDragging?: boolean;
	children: React.ReactNode;
}

export const Card = <T extends Data>({ item, itemActions, onSelect, isSelected, color, className, isDragging, children }: CardProps<T>) => {
	const { view } = itemActions;
	const containerClasses = cn(
		'relative border p-2 rounded-md transition-all',
		color ? `hover:border-${color}-500/50 hover:bg-opacity-80` : 'hover:bg-opacity-90',
		isSelected ? `border-${color}-500` : 'border-transparent',
		className
	);

	const handleOnSelect = () => {
		if (onSelect) {
			onSelect(item);
			view();
		}
	}

	return (
		<div
			className={containerClasses}
			onClick={handleOnSelect}
		>
			{children}

			<div className="mt-4">
				<ItemRealtimeActionsPreview itemActions={itemActions} isDragging={isDragging} />
			</div>
		</div>
	);
};
