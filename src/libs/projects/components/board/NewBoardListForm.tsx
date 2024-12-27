import React, { useState } from 'react';
import { uid } from '@/core/data';
import { Button, IconButton, Input, Icon } from '@/core/ui';
import { useProjects, type Project } from '@/projects';

interface NewBoardListFormProps {
  project: Project
}

export const NewBoardListForm = ({ project }: NewBoardListFormProps) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { update } = useProjects();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await update(project.id, {
      lists: [...project.lists ?? [], { id: uid(name), name }],
    });
    setShowForm(false);
    setIsLoading(false);
    setName('');
  };

  return (
    <div className="w-64 h-28 shrink-0 bg-slate-800 rounded-md mx-2">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center w-full h-full space-x-1 hover:border rounded-md border-slate-600"
        >
          <Icon.Plus />
          <span>Add List</span>
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="List name..."
            autoFocus
          />
          <div className="flex space-x-2 items-center mt-2.5">
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={name.trim() === ''}
              size="sm"
            >
              Add list
            </Button>
            <IconButton.X onClick={() => setShowForm(false)} />
          </div>
        </form>
      )}
    </div>
  );
};
