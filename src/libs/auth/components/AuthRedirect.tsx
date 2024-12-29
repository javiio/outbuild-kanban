'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { PageLoader } from '@/core/ui';
import { useAuth } from '@/auth';
import { useProjects } from '@/projects';

// Show the Outbuild loading logo for a minimum amount of time
const FORCE_LOADING_LOGO_TIMEOUT = 1600;

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const [forceLoadingLogo, setForceLoadingLogo] = useState(true);
  const { currentUser } = useAuth();
  const { list: projects, isLoading: isProjectsLoading } = useProjects();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      setForceLoadingLogo(false);
    }, FORCE_LOADING_LOGO_TIMEOUT);
  }, []);

  useEffect(() => {
    if (!forceLoadingLogo && currentUser === undefined && pathname !== '/login') {
      router.push('/login');
    }
    if (!forceLoadingLogo && currentUser && !isProjectsLoading && (pathname === '/' || pathname === '/login')) {
      if (projects.length > 0) {
        router.push(`/board/${projects[0].id}`);
      } else {
        router.push('/projects');
      }
    }
  }, [router, currentUser, pathname, forceLoadingLogo, projects, isProjectsLoading]);

  if (pathname === '/login') {
    return children;
  }

  if (forceLoadingLogo || !currentUser || isProjectsLoading) {
    return <PageLoader />;
  }

  return children;
};
