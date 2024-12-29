import React, {
  useContext,
  createContext,
  type ReactNode,
} from 'react';
import { useCollection, defaultCollectionContext, type CollectionContext } from '@/core/data';
import type { Project } from '@/projects';

type ProjectContextProps = CollectionContext<Project>;

const ProjectContext = createContext<ProjectContextProps>(defaultCollectionContext);

export const ProvideProjects = ({ children }: { children: ReactNode }) => {
  const collection = useCollection<Project>('projects');

  return (
    <ProjectContext.Provider value={collection}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
