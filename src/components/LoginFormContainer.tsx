import { useRouter } from 'next/router';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { postSignIn } from '../api/api';
import LoginForm from './LoginForm';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

const ACCESS_TOKEN = Cookies.get('accessToken');

const LoginFormContainer = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const eyeButtonClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const loginClickHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await postSignIn(email, password);
      route.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          alert(error.response.data.message);
        }
      }
    }
  };

  useEffect(() => {
    if (ACCESS_TOKEN) {
      route.back();
    }
  }, []);
  return (
    <LoginForm
      eyeButtonClickHandler={eyeButtonClickHandler}
      isOpen={isOpen}
      email={email}
      password={password}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      loginClickHandler={loginClickHandler}
    />
  );
};

export default LoginFormContainer;

