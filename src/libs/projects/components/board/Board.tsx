/**
 * Adaptation from MultipleContainers example from dnd-kit to implement the Outbuild Kanban board :)
 * https://github.com/clauderic/dnd-kit/blob/master/stories/2%20-%20Presets/Sortable/MultipleContainers.tsx
 */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  closestCenter,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensors,
  useSensor,
  MeasuringStrategy,
  defaultDropAnimationSideEffects,
  DragOverlay,
  type CollisionDetection,
  type UniqueIdentifier,
  type DropAnimation,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  type AnimateLayoutChanges,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRealtime } from '@/core/data';
import {
  useProject,
  useProjects,
  BoardListItem,
  BoardList,
  NewBoardListForm,
  type BoardListType, type Project } from '@/projects';
  import { useTasks, TaskCard } from '@/tasks';

interface ProjectBoardProps {
  project: Project
};

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: { opacity: '0.5' },
    },
  }),
};

export const ProjectBoard = ({ project }: ProjectBoardProps) => {
  const { list: tasks, update: updateTask } = useTasks();
  const [items, setItems] = useState<Items>({});
  const [containers, setContainers] = useState<UniqueIdentifier[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const { update: updateProject } = useProjects();
  const { setMoving, unsetMoving } = useRealtime();

  useEffect(() => {
    const items = tasks.reduce((acc, task) => {
      if (!acc[task.listId]) {
        acc[task.listId] = [];
      }
      acc[task.listId].push(task.id);
      return acc;
    }, project.lists.reduce((acc, list) => ({ ...acc, [list.id]: [] }), {} as Items));
    
    setItems(items);
    setContainers(project.lists.map((list) => list.id) ?? [] as UniqueIdentifier[]);
  }, [project, tasks]);

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? pointerIntersections // If there are droppables intersecting with the pointer, return those
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );

  const renderSortableItemDragOverlay = (id: UniqueIdentifier) => {
    return (
      <div className="rotate-2">
        <TaskCard task={id as string} />
      </div>
    );
  };

  const renderContainerDragOverlay = (containerId: UniqueIdentifier) => {
    const list = project.lists.find((list) => list.id === containerId);
    if (!list) {
      return null;
    }

    return (
      <div className="opacity-90 rotate-2 rounded-lg">
        <BoardList
          project={project}
          list={list}
        >
          {items[containerId].map((item) => <TaskCard key={item} task={item as string} />)}
        </BoardList>
      </div>
    );
  };

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    // Check if it is a task instead of a list
    if (activeId && !(activeId in items)) {
      // finishMovingTask(activeId);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(items);

        // Check if it is a task instead of a list
        if (!(active.id in items)) {
          setMoving('tasks', active.id as string);
        }
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id;
        if (overId == null || active.id in items) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex: number;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (item) => item !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length
                ),
              ],
            };
          });
        }
      }}
      onDragEnd={async ({ active, over }) => {
        if (active.id in items && over?.id) {
          const activeIndex = containers.indexOf(active.id);
          const overIndex = containers.indexOf(over.id);
          const _containers = arrayMove(containers, activeIndex, overIndex);
          setContainers(_containers);
          const lists = _containers.map((id) => project.lists.find((list) => list.id === id)) as BoardListType[];
          await updateProject(project.id, { lists });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (overId == null) {
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);

          if (activeIndex !== overIndex) {
            setItems((items) => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ),
            }));
          }

          await updateTask(active.id as string, { listId: overContainer as string });
          unsetMoving();
        }

        setActiveId(null);
      }}
      onDragCancel={onDragCancel}
    >
      <div className="flex space-x-2 pl-4 overflow-x-auto h-[calc(100vh-6.1rem)] w-full">
        <SortableContext
          items={[...containers]}
          strategy={horizontalListSortingStrategy}
        >
          {containers.map((containerId) => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              project={project}
              items={items[containerId]}
            >
              <SortableContext items={items[containerId]} strategy={verticalListSortingStrategy}>
                {items[containerId].map((value) => {
                  return (
                    <BoardListItem key={value} id={value} />
                  );
                })}
              </SortableContext>
            </DroppableContainer>
          ))}
        </SortableContext>

        {project && <NewBoardListForm project={project} />}
      </div>

      {createPortal(
        <DragOverlay dropAnimation={dropAnimation}>
          {activeId
            ? containers.includes(activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

interface DroppableContainerProps {
  id: UniqueIdentifier
  items: UniqueIdentifier[]
  project: Project
  children: React.ReactNode
}
const DroppableContainer = ({ id, items, project, children }: DroppableContainerProps) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: { type: 'container', children: items },
    animateLayoutChanges,
  });
  const list = project?.lists?.find((list) => list.id === id);

  if (!list) {
    return null;
  }

  return (
    <div
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={isDragging ? 'opacity-50 text-transparent' : ''}
      ref={setNodeRef}
    >
      <BoardList
        handleProps={{ ref: setActivatorNodeRef, ...listeners, ...attributes }}
        project={project}
        list={list}
      >
        {children}
      </BoardList>
    </div>
  );
};
