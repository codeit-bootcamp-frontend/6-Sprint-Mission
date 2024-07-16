import React, { ChangeEvent, useEffect, useState } from 'react';
import SignUpForm from './SignUpForm';

import { postSignUp } from '../api/api';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
export interface SignUp {
  email: string;
  nickName: string;
  password: string;
  repeatPassword: string;
}

export interface Show {
  passShow: boolean;
  repeatShow: boolean;
}

const SignUpContainer = () => {
  const {
    watch,
    register,
    formState: { errors },
    setError,
    clearErrors,
    handleSubmit,
  } = useForm<SignUp>({ mode: 'onChange' });

  const [isShow, setIsShow] = useState<Show>({
    passShow: false,
    repeatShow: false,
  });

  const route = useRouter();

  const passwordHideHandler = () => {
    setIsShow({ ...isShow, passShow: !isShow.passShow });
  };

  const repeatPasswordHideHandler = () => {
    setIsShow({ ...isShow, repeatShow: !isShow.repeatShow });
  };

  const serveSignUp = async (data: SignUp) => {
    try {
      await postSignUp(
        data.email,
        data.nickName,
        data.password,
        data.repeatPassword
      );
      route.push('/login');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          alert(error.response.data.message);
        }
      }
    }
  };

  return (
    <SignUpForm
      watch={watch}
      setError={setError}
      clearErrors={clearErrors}
      register={register}
      errors={errors}
      isShow={isShow}
      passwordHideHandler={passwordHideHandler}
      repeatPasswordHideHandler={repeatPasswordHideHandler}
      handleSubmit={handleSubmit(serveSignUp)}
    />
  );
};

export default SignUpContainer;

