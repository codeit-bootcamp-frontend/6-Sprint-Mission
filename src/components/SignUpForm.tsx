import React, { useEffect } from 'react';
import { Show, SignUp } from './SignUpContainer';
import styles from '@/styles/signup.module.css';
import hideEyes from '@/src/img/hidePassword.png';
import openEyes from '@/src/img/openPassword.png';
import kakao from '@/src/img/kakao.png';
import google from '@/src/img/google.png';
import bigLogo from '@/src/img/bigLogo.png';
import Link from 'next/link';
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface SignUpInfo {
  handleSubmit: () => void;
  register: UseFormRegister<SignUp>;
  watch: UseFormWatch<SignUp>;
  setError: UseFormSetError<SignUp>;
  clearErrors: UseFormClearErrors<SignUp>;
  errors: FieldErrors<SignUp>;
}

interface EyesButton {
  isShow: Show;
  passwordHideHandler: () => void;
  repeatPasswordHideHandler: () => void;
}

const SignUpForm = ({
  clearErrors,
  setError,
  register,
  handleSubmit,
  errors,
  isShow,
  passwordHideHandler,
  repeatPasswordHideHandler,
  watch,
}: SignUpInfo & EyesButton) => {
  useEffect(() => {
    if (watch('password') !== watch('repeatPassword')) {
      setError('repeatPassword', {
        type: 'password-mismatch',
        message: '비밀번호가 일치하지 않습니다',
      });
    } else {
      // 비밀번호 일치시 오류 제거
      clearErrors('repeatPassword');
    }
  }, [watch('password'), watch('repeatPassword')]);

  return (
    <div className={styles['section']}>
      <Link className={styles['logo']} href='/'>
        <img src={bigLogo.src} />
      </Link>

      <form className={styles['signUpTable']} onSubmit={handleSubmit}>
        이메일
        <label className={styles['emailLabel']}>
          <input
            {...register('email', {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                message: '이메일형식이 올바르지 않습니다.',
              },
            })}
            placeholder='이메일을 입력해주세요'
            className={`${styles['emailInput']} ${styles['inputContainer']}`}
          />
        </label>
        <ErrorMessage
          errors={errors}
          name={'email'}
          render={({ message }) => <p className={styles['error']}>{message}</p>}
        />
        닉네임
        <label>
          <input
            {...register('nickName', {
              validate: (value) =>
                value.length >= 6 && '닉네임은 6자리이하만 됩니다',
            })}
            id='shown'
            type='text'
            className={styles['inputContainer']}
            placeholder='닉네임을 입력해주세요'
          />
        </label>
        <ErrorMessage
          errors={errors}
          name={'nickName'}
          render={({ message }) => <p className={styles['error']}>{message}</p>}
        />
        비밀번호
        <label className={styles['passwordLabel']}>
          <input
            {...register('password')}
            className={`${styles['passwordInput']} ${styles['inputContainer']}`}
            type={isShow.passShow ? 'text' : 'password'}
            placeholder='비밀번호를 입력해주세요'
          />
          <img
            onClick={passwordHideHandler}
            id='eyeIcon'
            src={isShow.passShow ? openEyes.src : hideEyes.src}
            alt='눈알'
          />
        </label>
        비밀번호 확인
        <label className={styles['passwordLabel']}>
          <input
            {...register('repeatPassword')}
            className={`${styles['passwordRepeatInput']} ${styles['inputContainer']}`}
            type={isShow.repeatShow ? 'text' : 'password'}
            placeholder='비밀번호를 입력해주세요'
          />

          <img
            id={'passIcon'}
            onClick={repeatPasswordHideHandler}
            src={isShow.repeatShow ? openEyes.src : hideEyes.src}
            alt='눈알'
          />
        </label>
        <ErrorMessage
          errors={errors}
          name={'repeatPassword'}
          render={({ message }) => <p className={styles['error']}>{message}</p>}
        />
        <button className={styles['signUpButton']} type='submit'>
          회원가입
        </button>
      </form>

      <div className={styles['simpleLoginBox']}>
        <p>간편로그인하기</p>
        <div className={styles['simpleLoginIcons']}>
          <a href='https://www.google.com/'>
            <img src={google.src} alt='구글' />
          </a>
          <a href='https://www.kakaocorp.com/page/'>
            <img src={kakao.src} alt='카카오' />
          </a>
        </div>
      </div>
      <p className={styles['login']}>
        이미 회원이신가요? <Link href={'/login'}>로그인</Link>
      </p>
    </div>
  );
};

export default SignUpForm;

