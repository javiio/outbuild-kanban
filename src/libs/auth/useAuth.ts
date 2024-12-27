/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { now } from '@/core/data';
import { useUsers } from '@/users/data/useUsers';

// TODO: update this
import { firebaseApp } from '../core/data/config/firebaseConfig';

export const auth = getAuth(firebaseApp);

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { add, update, setSelected: setCurrentUser } = useUsers();
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(undefined);
      }
    });
  }, []);

  const login = (email: string, password: string) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await update(userCredential.user.uid, {
          isOnline: true,
          // lastSeen: now(),
        });
        await router.push('/');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  };

  const signup = (name: string, email: string, password: string) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await add({
          id: userCredential.user.uid,
          name,
          isOnline: true,
          // lastSeen: now(),
        });
        await router.push('/');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  };

  const logout = () => {
    signOut(auth)
      .then(async () => {
        await update(currentUser.id, {
          isOnline: false,
          lastSeen: now(),
        });
        await router.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    // currentUser,
    login,
    signup,
    logout,
    isLoading,
  };
};
