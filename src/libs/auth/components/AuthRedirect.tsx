'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { PageLoader } from '@/core/ui';
// import { useAuth } from '@/auth';
import { useUsers } from '@/users';

// Show the Outbuild loading logo for a minimum amount of time
const FORCE_LOADING_LOGO_TIMEOUT = 1400;

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const [forceLoadingLogo, setForceLoadingLogo] = useState(true);
  const { selected: currentUser } = useUsers();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      setForceLoadingLogo(false);
    }, FORCE_LOADING_LOGO_TIMEOUT);
  }, []);

  return children;

  useEffect(() => {
    if (!forceLoadingLogo && currentUser === undefined && pathname !== '/login') {
      router.push('/login');
    }
  }, [router, currentUser, pathname, forceLoadingLogo]);

  if (pathname === '/login') {
    return children;
  }

  if (forceLoadingLogo || !currentUser) {
    return <PageLoader />;
  }

  return children;
};
