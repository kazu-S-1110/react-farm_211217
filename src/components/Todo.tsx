import { LogoutIcon } from '@heroicons/react/outline';
import { VFC } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/solid';
import { useProcessAuth } from '../hooks/useProcessAuth';
import { useQueryTasks } from '../hooks/useQueryTasks';
import { useQueryUser } from '../hooks/useQueryUser';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectTask, setEditedTask } from '../slices/appSlice';
import { useProcessTask } from '../hooks/useProcessTask';
import { TaskItem } from './TaskItem';

export const Todo: VFC = () => {
  const { logout } = useProcessAuth();
  const { data: dataUser } = useQueryUser();
  const { data: dataTasks, isLoading: isLoadingTasks } = useQueryTasks();
  const dispatch = useAppDispatch();
  const editedTask = useAppSelector(selectTask);
  const { processTask } = useProcessTask();

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center">
        <ShieldCheckIcon className="h-8 w-8 mr-3 text-green-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">CRUD tasks</span>
      </div>
      <p className="my-3 text-sm">{dataUser?.email}</p>

      <LogoutIcon
        onClick={logout}
        className="h-7 w-7 mb-5 to-blue-500 cursor-pointer"
      />
      <form onSubmit={processTask}>
        <input
          type="text"
          placeholder="title ?"
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
          value={editedTask.title}
        />
        <input
          type="text"
          placeholder="description ?"
          className="mb-3  px-3 py-2 border border-gray-300"
          onChange={(e) =>
            dispatch(
              setEditedTask({ ...editedTask, description: e.target.value })
            )
          }
          value={editedTask.description}
        />
        <button
          disabled={!editedTask.title || !editedTask.description}
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
        >
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
      {isLoadingTasks ? (
        <p>Loading...</p>
      ) : (
        <ul className="my-5">
          {dataTasks?.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
