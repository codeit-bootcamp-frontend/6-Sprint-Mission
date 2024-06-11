import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import img_logo_big from '../public/images/img_logo_big.png';
import google from '../public/images/google.png';
import kakao from '../public/images/kakao.png';
import Link from 'next/link';
import Image from 'next/image';
import { loginUser } from '@/lib/api/loginUser';
import { useRouter } from 'next/router';

type ErrorState = {
  emailNull: boolean;
  emailInvalid: boolean;
  passwordNull: boolean;
  passwordInvalid: boolean;
};

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorState>({
    emailNull: false,
    emailInvalid: false,
    passwordNull: false,
    passwordInvalid: false,
  });
  const [isLoginActive, setIsLoginActive] = useState<boolean>(false);
  const router = useRouter();

  const checkEmailValidity: RegExp = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  const emailChecker = function () {
    if (!email) {
      setErrors(prev => ({ ...prev, emailNull: true, emailInvalid: false }));
    } else if (!checkEmailValidity.test(email)) {
      setErrors(prev => ({ ...prev, emailNull: false, emailInvalid: true }));
    } else {
      setErrors(prev => ({ ...prev, emailNull: false, emailInvalid: false }));
    }
  };

  const passwordChecker = function () {
    if (!password) {
      setErrors(prev => ({ ...prev, passwordNull: true, passwordInvalid: false }));
    } else if (password.length < 8) {
      setErrors(prev => ({ ...prev, passwordNull: false, passwordInvalid: true }));
    } else {
      setErrors(prev => ({ ...prev, passwordNull: false, passwordInvalid: false }));
    }
  };

  const handleInputChange = function (setter: React.Dispatch<React.SetStateAction<string>>) {
    return function (e: ChangeEvent<HTMLInputElement>) {
      setter(e.target.value);
    };
  };

  const removeError = function () {
    setErrors({
      emailNull: false,
      emailInvalid: false,
      passwordNull: false,
      passwordInvalid: false,
    });
  };

  const isActiveLogin = function () {
    if (email && password && password.length >= 8 && checkEmailValidity.test(email)) {
      setIsLoginActive(true);
    } else {
      setIsLoginActive(false);
    }
  };

  useEffect(() => {
    isActiveLogin();
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const { accessToken } = response;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        await router.replace('/boards');
      }
    } catch (e) {
      console.error(e);
      return alert('로그인 실패ㅠㅠ');
    }
  };

  return (
    <div className='login-container'>
      <header className='login-header'>
        <Link href='/'>
          <Image src={img_logo_big} alt='판다마켓 로고' />
        </Link>
      </header>
      <main className='h-[100vw]'>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='login-input-group'>
            <label htmlFor='email'>이메일</label>
            <input
              id='email'
              className={`login-input ${errors.emailNull || errors.emailInvalid ? 'login-input-error' : ''}`}
              type='email'
              placeholder='이메일을 입력해주세요'
              value={email}
              onChange={handleInputChange(setEmail)}
              onBlur={emailChecker}
              onFocus={removeError}
            />
            {errors.emailNull && <span className='login-error-message'>이메일을 입력해주세요</span>}
            {errors.emailInvalid && <span className='login-error-message'>잘못된 이메일 형식입니다</span>}
          </div>
          <div className='login-input-group'>
            <label htmlFor='password'>비밀번호</label>
            <input
              id='password'
              className={`login-input ${errors.passwordNull || errors.passwordInvalid ? 'login-input-error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              placeholder='비밀번호를 입력해주세요'
              value={password}
              onChange={handleInputChange(setPassword)}
              onBlur={passwordChecker}
              onFocus={removeError}
            />
            {errors.passwordNull && <span className='login-error-message'>비밀번호를 입력해주세요</span>}
            {errors.passwordInvalid && <span className='login-error-message'>비밀번호를 8자 이상 입력해주세요</span>}
            <div className='login-password-toggle'>
              <input
                type='checkbox'
                id='password-toggle'
                checked={showPassword}
                onChange={() => setShowPassword(prev => !prev)}
              />
              <label htmlFor='password-toggle' className='login-password-toggle-btn'></label>
            </div>
          </div>

          <button
            className={`login-button ${isLoginActive ? 'login-button-active' : ''}`}
            type='submit'
            disabled={!isLoginActive}>
            로그인
          </button>
        </form>
        <div className='login-easy'>
          <h4>간편 로그인하기</h4>
          <div className='login-easy-links'>
            <a href='http://www.google.com'>
              <picture>
                <Image src={google} alt='구글' />
              </picture>
            </a>
            <a href='http://kakaocorp.com/page/'>
              <picture>
                <Image src={kakao} alt='카카오톡' />
              </picture>
            </a>
          </div>
        </div>
      </main>
      <footer className='login-footer'>
        판다마켓이 처음이신가요? <Link href='/signup'>회원가입</Link>
      </footer>
    </div>
  );
}
