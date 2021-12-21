import { useMutateAuth } from './useMutateAuth';
import { FormEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

export const useProcessAuth = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth();

  //Submitされたときに発火する関数を定義
  const processAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: pw,
      });
    } else {
      //登録したらログインの処理も走るように処理する
      await registerMutation
        .mutateAsync({
          email: email,
          password: pw,
        })
        .then(() => {
          loginMutation.mutate({
            email: email,
            password: pw,
          });
        })
        .catch(() => {
          setPw('');
          setEmail('');
        });
    }
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    // cacheを全て消す処理
    queryClient.removeQueries('tasks');
    queryClient.removeQueries('user');
    queryClient.removeQueries('single');
    history.push('/');
  };

  return {
    email,
    setEmail,
    pw,
    setPw,
    isLogin,
    setIsLogin,
    processAuth,
    registerMutation,
    loginMutation,
    logout,
  };
};
