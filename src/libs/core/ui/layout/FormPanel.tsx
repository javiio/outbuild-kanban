'use client';

import React from 'react';
import { useRightPanel } from '@/core/data';
import { IconButton } from '@/core/ui';
import { ProjectForm, type Project } from '@/projects';
import { TaskForm, type Task } from '@/tasks';

export const FormPanel = () => {
  const { showing, hidePanel } = useRightPanel();

	return (
    <div className="p-4">
      <div className="bg-slate-700 px-3 py-1 text-xs inline-block font-semibold rounded mb-3.5">
        {showing?.type.toUpperCase()}
      </div>
      {showing?.type === 'projects' && (
        <ProjectForm
          project={showing.item as Project}
          key={showing.item?.id}
        />
      )}
      {showing?.type === 'tasks' && (
        <TaskForm
          task={showing.item as Task}
          key={showing.item?.id}
        />
      )}

      <IconButton.X
        onClick={hidePanel}
        className="absolute right-3 top-8 border  bg-slate-800 !rounded-full"
        size={6}
      />
    </div>
  );
};
