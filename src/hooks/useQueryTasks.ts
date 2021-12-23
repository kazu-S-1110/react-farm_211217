import { Task } from './../types/types';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useQueryTasks = () => {
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>(
      `${process.env.REACT_APP_API_URL}/todo`,
      {
        withCredentials: true,
      }
    );
    return data;
  };

  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: getTasks,
    staleTime: Infinity, //格納したデータをどれくらい最新とみなすか、Infinityをした場合、ずっと最新とみなすので再フェッチしなくなる
  });
};
