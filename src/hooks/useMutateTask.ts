import { useMutation, useQueryClient } from 'react-query';
import { useAppDispatch } from './../app/hooks';
import { useHistory } from 'react-router-dom';
import { resetEditedTask, toggleCsrfState } from '../slices/appSlice';
import { Task } from '../types/types';
import axios from 'axios';

export const useMutateTask = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation(
    (task: Omit<Task, 'id'>) =>
      axios.post<Task>(`${process.env.REACT_APP_API_URL}/todo`, task, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks');
        if (previousTodos) {
          queryClient.setQueryData('tasks', [...previousTodos, res.data]);
        }
        dispatch(resetEditedTask());
      },
    }
  );
};
