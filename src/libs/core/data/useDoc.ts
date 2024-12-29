'use client';
import { useState, useEffect } from 'react';
import {
	doc,
  updateDoc,
  deleteDoc,
	onSnapshot,
} from 'firebase/firestore';
import { RealtimeAction, useRealtime, type Data, type ItemActions } from '@/core/data';
import { db } from './config/firebaseConfig';

// TODO: rename useDoc to useActionItem
export const useDoc = <T extends Data>(
	collectionName: string,
	data: T | string,
	config?: { realtime: boolean }
): ItemActions<T> => {
	const [id] = useState(typeof data === 'string' ? data : data.id);
	const [path] = useState(`${collectionName}/${id}`);
	const [item, setItem] = useState<T | undefined>(typeof data !== 'string' ? data : undefined);
	const [viewers, setViewers] = useState<RealtimeAction[]>([]);
	const [editors, setEditors] = useState<RealtimeAction[]>([]);
	const [mover, setMover] = useState<RealtimeAction | null>();
	const [isLoading, setIsLoading] = useState(false);
	const {
		actionsMap,
		viewItem,
		unview,
		startEditingItem,
		finishEditing,
		startMovingItem,
		finishMoving
	} = useRealtime();

	useEffect(() => {
		if (config?.realtime) {
			const unsubscribe = onSnapshot(doc(db, path), (doc) => {
				if (doc.exists()) {
					setItem(doc.data() as T);
				} else {
					setItem(undefined);
				}
			});
	
			return () => unsubscribe();
		}
	}, []);

	useEffect(() => {
		setViewers(actionsMap[path]?.viewers || []);
		setEditors(actionsMap[path]?.editing || []);
		setMover(actionsMap[path]?.moving);
	}, [actionsMap]);

	const update = async (attrs: Partial<T>) => {
		setIsLoading(true);

    await updateDoc(doc(db, path), attrs as object);
		setIsLoading(false);
  };

	const remove = async () => {
    await deleteDoc(doc(db, path));
  }

	const view = async () => {
		await viewItem(collectionName, id);
	};

	const startEditing = async (field: string) => {
		await startEditingItem(collectionName, id, field);
	};

	const startMoving = async () => {
		await startMovingItem(collectionName, id);
	}

	return {
		item,
		update,
		remove,
		view,
		unview,
		viewers,
		editors,
		mover,
		startEditing,
		finishEditing,
		startMoving,
		finishMoving,
		isLoading,
	};
};
