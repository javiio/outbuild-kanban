'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { Icon } from '@/core/ui';
import { useProjects, type Project } from '@/projects';

export const ProjectTabs = () => {
  const { list: projects } = useProjects();
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="flex space-x-2 overflow-x-hidden no-scrollbar">
      {projects.map((p: Project) => (
        <button
          key={p.id}
          type="button"
          onClick={() => { router.push(`./${p.id}`); }}
          className={cn(
            'relative px-4 py-1.5 text-sm min-w-[78px] rounded-full border border-transparent shrink-0 flex items-center',
            p.id === id ? '' : `hover:text-slate-300 hover:border-${p.color}-500/50`
          )}
        >
          {p.id === id && (
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
