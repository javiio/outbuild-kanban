import React, { useState } from 'react';
import { debounce } from 'lodash';
import { ActionType, type ItemActions, type DataWithDescription } from '@/core/data';
import { useAuth } from '@/auth';
import { ProfilePic } from '@/users';

const DEBOUNCE_TIMEOUT = 900;


interface TextareaProps<T extends DataWithDescription> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  itemActions: ItemActions<T>;
  field?: 'description';
}

export const Textarea = <T extends DataWithDescription>({
  itemActions,
  field = 'description',
  placeholder,
  className,
  ...props
}: TextareaProps<T>) => {
  const { item, update, startEditing, finishEditing, editors } = itemActions;
  const [value, setValue] = useState(item && item[field] || '');
  const { currentUser } = useAuth();

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
