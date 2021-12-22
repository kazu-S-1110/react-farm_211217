import { LogoutIcon } from '@heroicons/react/outline';
import { VFC } from 'react';
import { useProcessAuth } from '../hooks/useProcessAuth';

export const Todo: VFC = () => {
  const { logout } = useProcessAuth();
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <LogoutIcon
        onClick={logout}
        className="h-7 w-7 mb-5 to-blue-500 cursor-pointer"
      />
    </div>
  );
};
