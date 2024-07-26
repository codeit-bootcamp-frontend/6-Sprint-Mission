import React from 'react';
import style from './style.module.css';
import { useForm } from 'react-hook-form';
import { LoginFormData } from 'types/auth';
import { EMAIL_PATTERN, PW_MIN_LEN } from 'constants/authForm';
import { ERROR_MESSAGE } from 'constants/errorMessage';
import FormError from 'components/Auth/FormError';
import SwitchPrompt from 'components/Auth/SwitchPrompt';
import FormInput from 'components/Auth/FormInput';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'api/auth/signIn';
import { STORAGE_KEYS } from 'constants/storageKey';
import NewButton from 'components/NewButton';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => signIn(data),
    onSuccess: (res) => {
      localStorage.setItem(STORAGE_KEYS.accessToken, res.accessToken);
      localStorage.setItem(STORAGE_KEYS.refreshToken, res.refreshToken);
      localStorage.setItem('userId', res.user.id);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ mode: 'onBlur' });

  const onSubmit = async (data: LoginFormData) => {
    mutate(data, {
      onSuccess: () => {
        alert('로그인 됨');
        navigate('/items');
      },
    });
  };

  return (
    <main className={style.main}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="이메일"
          id="email"
          placeholder="이메일을 입력해주세요"
          type="email"
          error={!!errors.email}
          {...register('email', {
            required: ERROR_MESSAGE.emailRequired,
            pattern: {
              value: EMAIL_PATTERN,
              message: ERROR_MESSAGE.invalidEmail,
            },
          })}
        />
        {errors.email && <FormError message={errors.email.message} />}

        <FormInput
          label="비밀번호"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          autoComplete="new-password"
          error={!!errors.password}
          {...register('password', {
            required: ERROR_MESSAGE.passwordRequired,
            minLength: {
              value: PW_MIN_LEN,
              message: ERROR_MESSAGE.passwordLength(PW_MIN_LEN),
            },
          })}
        />
        {errors.password && <FormError message={errors.password.message} />}

        <NewButton rounded type="submit" disabled={!isValid || isPending}>
          {isPending ? '로딩중' : '로그인'}
        </NewButton>
      </form>
      <SwitchPrompt type="회원가입" />
    </main>
  );
};

export default LoginPage;
