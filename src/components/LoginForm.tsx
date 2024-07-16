import React, { ChangeEvent } from 'react';
import style from '@/styles/Login.module.css';
import bigLogo from '@/src/img/bigLogo.png';
import kakaoImage from '@/src/img/kakao.png';
import googleImage from '@/src/img/google.png';
import openPassword from '@/src/img/openPassword.png';
import hidePassword from '@/src/img/hidePassword.png';
import Link from 'next/link';

interface Login {
  email: string;
  password: string;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  loginClickHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}
interface isHide {
  isOpen: boolean;
  eyeButtonClickHandler: () => void;
}

const LoginForm = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  isOpen,
  eyeButtonClickHandler: onClick,
  loginClickHandler,
}: Login & isHide) => {
  return (
    <>
      <form className={style['section']} onSubmit={loginClickHandler}>
        <Link className={style['homeBtn']} href={'/main'}>
          <img src={bigLogo.src} />
        </Link>
        <div className={style['loginBox']}>
          이메일
          <label className={style['emailLabel']}>
            <input
              value={email}
              onChange={onChangeEmail}
              className='emailInput'
              title='이메일'
              placeholder='이메일을 입력해주세요'
            />
          </label>
          <div className={style['email-error-message']}></div>
          비밀번호
          <label className={style['passwordLabel']}>
            <input
              value={password}
              onChange={onChangePassword}
              className='passwordBar'
              title='비밀번호'
              type={isOpen ? 'text' : 'password'}
              placeholder='비밀번호를 입력해주세요'
            />
            <img
              onClick={onClick}
              id='eyeIcon'
              src={isOpen ? openPassword.src : hidePassword.src}
              alt='closeEyes'
            />
          </label>
          <div className={style['pw-error-message']}></div>
        </div>

        <button className={style['loginButton']} type='submit'>
          로그인
        </button>
        <div className={style['simpleLoginBox']}>
          <p>간편 로그인 하기</p>
          <div className='simpleLoginIcons'>
            <Link href='https://www.google.com/'>
              <img src={googleImage.src} alt='구글' />
            </Link>
            <Link href='https://www.kakaocorp.com/page/'>
              <img src={kakaoImage.src} alt='카카오' />
            </Link>
          </div>
        </div>
      </form>
      <div className={style['signUp']}>
        판다 마켓이 처음이신가요? <Link href={'/signUp'}>회원가입</Link>
      </div>
    </>
  );
};

export default LoginForm;

