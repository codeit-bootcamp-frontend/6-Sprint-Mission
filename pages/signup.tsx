import React from 'react';
import pandaLogo from '@/public/icon/panda_logo.svg';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/signup.module.css';
import SocialLogin from '@/components/socialLogin';
import SignUpForm from '@/components/signup/signupForm';

export default function SignUp() {
  return (
    <div className={styles.signin_container}>
      <div className={styles.signin_logo}>
        <Link href="/">
          <Image src={pandaLogo} alt="판다마켓" width={396} />
        </Link>
      </div>
      <SignUpForm />
      <SocialLogin />
      <div className={styles.switch_signup}>
        이미 회원이신가요? <Link href="/signin">로그인</Link>
      </div>
    </div>
  );
}