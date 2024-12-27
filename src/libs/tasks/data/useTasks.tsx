'use client';
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useCollection, defaultCollectionContext, type CollectionContext } from '@/core/data';
import { useProjects, type Project } from '@/projects';
import type { Task } from '@/tasks';

interface TaskContextProps extends CollectionContext<Task> {
  currentProject?: Project;
  setCurrentProject: (project: Project) => void;
};

const TaskContext = createContext<TaskContextProps>({
  ...defaultCollectionContext,
  setCurrentProject: () => {},
});

export const ProvideTasks = ({ children }: { children: ReactNode }) => {
  const collection = useCollection<Task>('tasks');
  const { list: projects } = useProjects();
  const [currentProject, setCurrentProject] = useState<Project>();

  useEffect(() => {
    if (projects.length && !currentProject) {
      setCurrentProject(projects[0]);
    }
  }, [projects])

  return (
    <TaskContext.Provider value={{ ...collection, currentProject, setCurrentProject }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
