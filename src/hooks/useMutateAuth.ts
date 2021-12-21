import axios from 'axios';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { resetEditedTask, toggleCsrfState } from '../slices/appSlice';
import { User } from '../types/types';

export const useMutateAuth = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const loginMutation = useMutation(
    async (user: User) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/login`, user, {
        withCredentials: true,
      }),
    {
      // 上が成功した場合の処理
      onSuccess: () => {
        history.push('/todo');
      },
      // 失敗した場合の処理
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState());
        }
      },
    }
  );

  const registerMutation = useMutation(
    async (user: User) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/register`, user),
    {
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState());
        }
      },
    }
  );

  const logoutMutation = useMutation(
    async () =>
      await axios.post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: () => {
        history.push('/');
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState());
          dispatch(resetEditedTask());
          history.push('/');
        }
      },
    }
  );

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
  };
};
