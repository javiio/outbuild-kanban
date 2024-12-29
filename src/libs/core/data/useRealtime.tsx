import { useEffect, useState } from 'react';
import { ActionType, now, type RealtimeItemTracking } from '@/core/data';
import { useUsers, type User } from '@/users';
import { useAuth } from '@/auth';

export const useRealtime = () => {
	const [actionsMap, setActionsMap] = useState<Record<string, RealtimeItemTracking>>({});
  const { list: users, update } = useUsers();
  const auth = useAuth();
  const currentUser = auth.currentUser as User;

	useEffect(() => {
    const _actionsMap = users.reduce((map, { viewing, editing, moving, isOnline }) => {
      if (!isOnline) {
        return map;
      }
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

  const viewItem = async (collectionName: string, itemId: string) => {
    await update(currentUser.id, {
      viewing: {
        collectionName,
        itemId,
        action: ActionType.View,
        userId: currentUser.id,
        startedAt: now(),
      },
    });
  };

  const unview = async () => {
    await update(currentUser.id, {
      viewing: null,
    });
  }

  const startEditingItem = async (collectionName: string, itemId: string, field: string) => {
    await update(currentUser.id, {
      editing: {
        collectionName,
        itemId,
        field,
        action: ActionType.Edit,
        userId: currentUser.id,
        startedAt: now(),
      },
    });
  };
  
  const finishEditing = async () => {
    await update(currentUser.id, {
      editing: null,
    });
  };

  const startMovingItem = async (collectionName: string, itemId: string) => {
    await update(currentUser.id, {
      moving: {
        collectionName,
        itemId,
        action: ActionType.Move,
        userId: currentUser.id,
        startedAt: now(),
      },
    });
  }

  const finishMoving = async () => {
    await update(currentUser.id, {
      moving: null,
    });
  }

	return {
		actionsMap,
    viewItem,
    unview,
    startEditingItem,
    finishEditing,
    startMovingItem,
    finishMoving,
	}
};
