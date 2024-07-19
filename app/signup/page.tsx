'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import PandaLogo from '@/app/assets/images/logo.png';
import SignUpForm from '@/app/signup/signUpForm';

import styles from './Page.module.css';

const SignUpPage = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.logo}>
        <span onClick={handleLogoClick}>
          <Image
            src={PandaLogo}
            className={styles.pandamarket}
            width="296"
            alt="판다마켓 로고"
          />
        </span>
      </div>
      <SignUpForm />
      <div className={styles.goLogin}>
        이미 회원이신가요?{' '}
        <a className={styles.loginLink} onClick={handleLoginClick}>
          로그인
        </a>
      </div>
    </div>
  );
};

export default SignUpPage;
