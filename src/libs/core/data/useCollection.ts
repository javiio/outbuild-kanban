'use client';
import { useEffect, useState } from 'react';
import { doc, setDoc, updateDoc, collection, onSnapshot } from 'firebase/firestore';
import { uid, now, type Data, type CollectionContext }	from '@/core/data';
import { db } from './config/firebaseConfig';

export const useCollection = <T extends Data>(name: string): CollectionContext<T> => {
	const [list, setList] = useState<T[]>([]);
	const [selected, setSelected] = useState<T | undefined>();
	const [isLoading, setIsLoading] = useState(true);

	const collectionRef = collection(db, name);

	useEffect(() => {
		const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
			setList(snapshot.docs.map((doc) => ({ ...doc.data() }) as T));
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (selected && !list.find((item) => item.id === selected.id)) {
			setSelected(undefined);
		}
	}, [list, selected]);

	const add = async (item: Partial<T>) => {
    const newItem = {
      id: item.id ?? uid(item.name),
      ...item,
			createdAt: now(),
    } as T;
		const path = `${name}/${newItem.id}`;

		await setDoc(doc(db, path), newItem, { merge: true });
		setSelected(newItem);
  }

	const update = async (itemId: string, attrs: Partial<T>) => {
		const path = `${name}/${itemId}`;
		await updateDoc(doc(db, path), attrs as object);
	}

	const get = (item: T | string) => {
		if (typeof item === 'string') {
			return list.find((i) => i.id === item);
		}
		
		return item;
	};

	return {
		name,
		list,
		add,
		update,
		selected,
		setSelected,
		get,
		isLoading,
	};
};

export const defaultCollectionContext = {
  name: '',
  list: [],
  add: async () => {},
  update: async () => {},
  remove: async () => {},
  selected: undefined,
  setSelected: () => {},
	get: () => undefined,
  isLoading: false,
};
