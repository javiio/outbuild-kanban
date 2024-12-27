import React, { useState } from 'react';
import { Button, IconButton, Input, Icons } from '@/core/ui';
import type { Project, BoardListType } from '@/projects';
import { useTasks } from '@/tasks';

interface NewTaskFormProps {
  project: Project
  list: BoardListType
}

export const NewTaskForm = ({ project, list }: NewTaskFormProps) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { add } = useTasks();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    await add({ name, projectId: project.id, listId: list.id });
    setName('');
    setShowForm(false);
    setIsLoading(false);
  };

  return (
    <div>
      {!showForm
        ? (
          <Button
            onClick={() => setShowForm(true)}
            size="sm"
            className="text-slate-400 w-full hover:bg-slate-800/80 hover:no-underline hover:text-white !container !mb-0 mt-1 pl-0 hover:pl-2 transition-all !justify-start"
            icon={Icons.Plus}
            variant='link'
          >
            Add new task
          </Button>)
        : (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800 rounded-lg p-2"
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Task name..."
              autoFocus
            />
            <div className="flex space-x-2 mt-2.5 items-center">
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={name.trim() === ''}
                size="sm"
              >
                Add new
              </Button>
              <IconButton.X onClick={() => setShowForm(false)} />
            </div>
          </form>)
      }
    </div>
  );
};
