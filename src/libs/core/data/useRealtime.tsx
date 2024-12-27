'use client';
import {
	useEffect,
	useState,
} from 'react';
import { ActionType, now, type RealtimeItemTracking } from '@/core/data';
import { useUsers, type User } from '@/users';

export const useRealtime = () => {
	const [actionsMap, setActionsMap] = useState<Record<string, RealtimeItemTracking>>({});
	const { list: users, update, selected } = useUsers();

	useEffect(() => {
    const _actionsMap = users.reduce((map, { viewing, editing, moving }) => {
      if (viewing) {
        const itemKey = `${viewing.collectionName}/${viewing.itemId}`;
        if (!map[itemKey]) {
          map[itemKey] = {
            viewers: [viewing],
            editing: [],
          };
        } else {
          map[itemKey].viewers.push(viewing);
        }
      }
      if (editing) {
        const itemKey = `${editing.collectionName}/${editing.itemId}`;
        if (!map[itemKey]) {
          map[itemKey] = {
            viewers: [],
            editing: [editing],
          };
        } else {
          map[itemKey].editing.push(editing);
        }
      }
      if (moving) {
        const itemKey = `${moving.collectionName}/${moving.itemId}`;
        if (!map[itemKey]) {
          map[itemKey] = {
            viewers: [],
            editing: [],
            moving,
          };
        } else {
          map[itemKey].moving = moving;
        }
      }

      return map;
    }, {} as Record<string, RealtimeItemTracking>);

    setActionsMap(_actionsMap);
  }, [users]);

  const setViewing = async (collectionName: string, itemId: string) => {
    await update((selected as User).id, {
      viewing: {
        collectionName,
        itemId,
        action: ActionType.View,
        userId: (selected as User).id,
        startedAt: now(),
      },
    });
  };

  const unsetViewing = async () => {
    await update((selected as User).id, {
      viewing: null,
    });
  }

  const setEditing = async (collectionName: string, itemId: string, field: string) => {
    await update((selected as User).id, {
      editing: {
        collectionName,
        itemId,
        field,
        action: ActionType.Edit,
        userId: (selected as User).id,
        startedAt: now(),
      },
    });
  };
  
  const unsetEditing = async () => {
    await update((selected as User).id, {
      editing: null,
    });
  };

  const setMoving = async (collectionName: string, itemId: string) => {
    await update((selected as User).id, {
      moving: {
        collectionName,
        itemId,
        action: ActionType.Move,
        userId: (selected as User).id,
        startedAt: now(),
      },
    });
  }

  const unsetMoving = async () => {
    await update((selected as User).id, {
      moving: null,
    });
  }

	return {
		actionsMap,
    setViewing,
    unsetViewing,
    setEditing,
    unsetEditing,
    setMoving,
    unsetMoving,
	}
};
