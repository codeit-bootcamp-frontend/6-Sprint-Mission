import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';

import { signUpUser } from '@/app/apis/SignUpUser';
import { signUpSchema } from '@/app/utils/validation/Schema';

import GoogleLogo from '../../app/assets/images/google.png';
import KakaoLogo from '../../app/assets/images/kakao.png';
import styles from './SignupForm.module.css';

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}

const SignUpForm = () => {
  const resolver = yupResolver(signUpSchema);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver,
    mode: 'onChange',
  });

  const handleSignUp = handleSubmit(async (data: FormValues) => {
    try {
      const response = await signUpUser(data);
      if (response) {
        console.log('회원가입 성공');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  });

  return (
    <>
      <form onSubmit={handleSignUp} className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            placeholder="이메일을 입력해주세요"
            type="email"
            {...register('email')}
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
          />
          <div className={styles.errorText}>{errors.email?.message}</div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="nickname" className={styles.label}>
            닉네임
          </label>
          <input
            placeholder="닉네임을 입력하세요"
            type="text"
            {...register('nickname')}
            className={`${styles.input} ${errors.nickname ? styles.error : ''}`}
          />
          <div className={styles.errorText}>{errors.nickname?.message}</div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            placeholder="비밀번호를 입력해주세요"
            type="password"
            {...register('password')}
            className={`${styles.input} ${errors.password ? styles.error : ''}`}
          />
          <div className={styles.errorText}>{errors.password?.message}</div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="passwordConfirmation" className={styles.label}>
            비밀번호 확인
          </label>
          <input
            placeholder="비밀번호를 다시 한번 입력해주세요"
            type="password"
            {...register('passwordConfirmation')}
            className={`${styles.input} ${
              errors.passwordConfirmation ? styles.error : ''
            }`}
          />
          <div className={styles.errorText}>
            {errors.passwordConfirmation?.message}
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`${styles.signUpButton} ${
            !isValid ? styles.disabled : ''
          }`}
        >
          회원가입
        </button>
        <div className={styles.socialLoginContainer}>
          <div className={styles.logText} id="log">
            간편 로그인하기
          </div>
          <div className={styles.socialLogin}>
            <a className="kakao-login" href="https://www.kakaocorp.com/page/">
              <Image className="kakao" src={KakaoLogo} alt="카카오톡 로고" />
            </a>
            <a className="google-login" href="https://www.google.com">
              <Image className="google" src={GoogleLogo} alt="구글 로고" />
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
