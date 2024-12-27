import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from '@/tasks';

export const BoardListItem = ({ id }: { id: UniqueIdentifier }) => {
  const {
    setNodeRef,
    isDragging,
    listeners,
    transform,
    transition,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={isDragging ? 'text-white/20 opacity-60 rounded-md' : ''}
      {...listeners}
    >
      <TaskCard task={id as string} isDragging={isDragging} />
    </div>
  );
};
