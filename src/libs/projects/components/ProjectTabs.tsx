import React from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { Icon } from '@/core/ui';
import { useProjects, type Project } from '@/projects';

interface ProjectTabsProps {
  project?: Project;
  setProject: (project: Project) => void;
}

export const ProjectTabs = ({ project, setProject }: ProjectTabsProps) => {
  const { list: projects } = useProjects();

  return (
    <div className="flex space-x-2 px-4 overflow-x-hidden no-scrollbar">
      {projects.map((p: Project) => (
        <button
          key={p.id}
          type="button"
          onClick={() => { setProject(p) }}
          className={cn(
            'relative px-4 py-1.5 text-sm min-w-[78px] rounded-full border border-transparent shrink-0 flex items-center',
            p.id === project?.id ? '' : `hover:text-slate-300 hover:border-${p.color}-500/50`
          )}
        >
          {p.id === project?.id && (
            <motion.span
              layoutId="bubble"
              className={cn(
                'absolute inset-0 mix-blend-difference rounded-full border -z-10',
                `border-${p.color}-500 bg-${p.color}-500/50`
              )}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Icon name={p.icon} className="mr-1.5" size={3.5} />
          <span>{p.name}</span>
        </button>
      ))}
    </div>
  );
};
