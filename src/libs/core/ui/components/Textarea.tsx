import React, { useState } from 'react';
import { debounce } from 'lodash';
import { ActionType, type ItemActions, type Data } from '@/core/data';
import { ProfilePic, useUsers } from '@/users';

const DEBOUNCE_TIMEOUT = 1000;

type TextareData = Data & {
  description: string;
  [key: string]: string;
}

interface TextareaProps<T extends TextareData> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  itemActions: ItemActions<T>;
  field?: keyof TextareData;
}

export const Textarea = <T extends Data>({ itemActions, field = 'description', placeholder, className, ...props }: TextareaProps<T>) => {
  const { item, update, startEditing, finishEditing, editors } = itemActions;
  const [value, setValue] = useState(item && item[field as keyof keyof TextareData] || '');
  const { selected: currentUser } = useUsers();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChangeDebounced({ [field]: e.target.value } as Partial<T>);
  }

  const onChangeDebounced = debounce(update, DEBOUNCE_TIMEOUT);

  const editing = editors.find((editor) => editor.field === field);

  return (
    <div className="relative">
      <textarea
        value={value as string}
        placeholder={placeholder ?? 'Enter text...'}
        disabled={!!(editing && editing.userId !== currentUser?.id)}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onFocus={() => startEditing(field as string)}
        onBlur={finishEditing}
        className={`bg-slate-900 rounded mt-1 text-sm min-h-24 focus:outline-4 focus:outline-none focus:outline-blue-500 block p-2.5 w-full ${className}`}
        {...props}
      />

      {editing && (
        <div className="absolute -top-5 right-0">
          <ProfilePic user={editing.userId} realtimeIndicator={ActionType.Edit} />
        </div>
      )}
    </div>
  );
};
