/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  type ReactNode,
} from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { now } from '@/core/data';
import { useUsers, type User } from '@/users';

import { firebaseApp } from '../core/data/config/firebaseConfig';
export const auth = getAuth(firebaseApp);

type AuthContextProps = {
  currentUser: User | null | undefined;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  isLoading: false,
});

export const ProvideAuth = ({ children }: { children: ReactNode }) => {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>();
  const [currentUser, setCurrentUser] = useState<User | undefined | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { list: users, add, update, get } = useUsers();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUser(undefined);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUserId && users.length) {
      setCurrentUser(get(currentUserId));
    }
  }, [users, currentUserId, get]);

  const login = (email: string, password: string) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await update(userCredential.user.uid, {
          isOnline: true,
          lastSeen: now(),
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
          lastSeen: now(),
        });
        await router.push('/');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  };

  const logout = () => {
    const userId = currentUserId as string;
    signOut(auth)
      .then(async () => {
        setCurrentUserId(undefined);
        await update(userId, {
          isOnline: false,
          lastSeen: now(),
        });
        await router.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
