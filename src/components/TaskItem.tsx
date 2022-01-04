import React, { VFC, memo } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { Task } from '../types/types';
import { useAppDispatch } from '../app/hooks';
import { useMutateTask } from '../hooks/useMutateTask';
import { setEditedTask } from '../slices/appSlice';

const TaskItemMemo: VFC<
  Task & {
    setId: React.Dispatch<React.SetStateAction<string>>; //setIdを受け取れるように変更。インターセクション型
  }
> = ({ id, title, description, setId }) => {
  const dispatch = useAppDispatch();
  const { deleteTaskMutation } = useMutateTask();

  return (
    <li>
      <span className="font-bold cursor-pointer" onClick={() => setId(id)}>
        {/* タイトルがクリックされたらsetIdで変更する */}
        {title}
      </span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(
              setEditedTask({
                id: id,
                title: title,
                description: description,
              })
            );
          }}
        />
        <TrashIcon
          className="h-5 w-5 to-blue-500 cursor-pointer"
          onClick={() => {
            deleteTaskMutation.mutate(id);
          }}
        />
      </div>
    </li>
  );
};

export const TaskItem = memo(TaskItemMemo);
