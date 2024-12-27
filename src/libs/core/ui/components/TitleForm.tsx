import React, { useState, useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import { type Data, type ItemActions } from '@/core/data';
import { Button, IconButton, Input, Icons, ActionsMenu, Text } from '@/core/ui';

interface TitleFormProps<T extends Data> {
  itemActions: ItemActions<T>;
}

export const TitleForm = <T extends Data>({ itemActions }: TitleFormProps<T>) => {
  const { item, update, remove, startEditing, finishEditing, isLoading } = itemActions;
  const [name, setName] = useState(item?.name || '');
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  useClickAway(formRef, () => handleFinishEditing());

  useEffect(() => {
    resetForm();
  }, [item]);

  const resetForm = () => {
    setName(item?.name || '');
    setIsEditing(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await update({ name } as Partial<T>);
    handleFinishEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      handleFinishEditing();
    }
  };

  const handleStartEditing = () => {
    startEditing('name');
    setIsEditing(true);
  }

  const handleFinishEditing = () => {
    finishEditing();
    resetForm();
  }

  const handleOnRemove = async () => {
    await remove();
  }

  return (
    <>
      {isEditing ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className="bg-slate-800 -mt-1 -ml-2 w-full"
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-2xl font-light px-2 py-1"
            placeholder="Name..."
            autoFocus
          />
          <div className="flex items-center space-x-2 mt-2.5 mb-1">
            <Button
              type="submit"
              size="sm"
              disabled={name.trim() === ''}
              isLoading={isLoading}
            >
              Update
            </Button>
            <IconButton.X onClick={handleFinishEditing} />
          </div>
        </form>
      ) : (
        <div className="flex space-x-2 relative">
          <Text.H2 className="flex-1" onClick={handleStartEditing}>
            {item?.name}
          </Text.H2>

          <div className="mt-1">
            <ActionsMenu
              items={[
                { icon: Icons.Edit, name: 'Edit', onClick: handleStartEditing },
                { icon: Icons.Remove, name: 'Remove', onClick: handleOnRemove },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};
