import { LogoutIcon } from '@heroicons/react/outline';
import { VFC } from 'react';
import { useProcessAuth } from '../hooks/useProcessAuth';
import { useQueryTasks } from '../hooks/useQueryTasks';
import { useQueryUser } from '../hooks/useQueryUser';

export const Todo: VFC = () => {
  const { logout } = useProcessAuth();
  const { data: dataUser } = useQueryUser();
  const { data: dataTasks, isLoading: isLoadingTasks } = useQueryTasks();
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <LogoutIcon
        onClick={logout}
        className="h-7 w-7 mb-5 to-blue-500 cursor-pointer"
      />
    </div>
  );
};
