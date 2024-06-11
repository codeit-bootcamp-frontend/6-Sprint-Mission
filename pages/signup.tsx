import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import img_logo_big from '../public/images/img_logo_big.png';
import google from '../public/images/google.png';
import kakao from '../public/images/kakao.png';
import { signUpUser } from '@/lib/api/signupUser';

type FormState = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

type ErrorsState = {
  email?: string;
  nickname?: string;
  password?: string;
  passwordConfirmation?: string;
};

export default function SignupPage() {
  const [form, setForm] = useState<FormState>({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsState>({});
  const [isSignupActive, setIsSignupActive] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = (email: string) => /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
  const validatePassword = (password: string) => password.length >= 8;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleBlur = useCallback(() => {
    const newErrors: ErrorsState = {};
    if (!form.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!validateEmail(form.email)) {
      newErrors.email = '잘못된 이메일 형식입니다';
    }
    if (!form.nickname) {
      newErrors.nickname = '닉네임을 입력해주세요';
    }
    if (!form.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (!validatePassword(form.password)) {
      newErrors.password = '비밀번호를 8자 이상 입력해주세요';
    }
    if (form.password !== form.passwordConfirmation) {
      newErrors.passwordConfirmation = '비밀번호가 일치하지 않습니다';
    }
    setErrors(newErrors);
  }, [form]);

  useEffect(() => {
    const isFormValid =
      validateEmail(form.email) &&
      form.nickname &&
      validatePassword(form.password) &&
      form.password === form.passwordConfirmation;
    setIsSignupActive(!!isFormValid);
  }, [form]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const togglePasswordCheckVisibility = useCallback(() => {
    setShowPasswordCheck(prev => !prev);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUpUser(form.email, form.nickname, form.password, form.passwordConfirmation);
      if (response) {
        await router.replace('/boards');
      }
      return response.data;
    } catch (e) {
      console.error(e);
      return alert('회원가입 실패ㅠㅠ');
    }
  };

  return (
    <div className='signup-container'>
      <header className='signup-header'>
        <Link href='/'>
          <Image src={img_logo_big} alt='판다마켓 로고' />
        </Link>
      </header>
      <main className='signup-main'>
        <form className='signup-form' onSubmit={handleSubmit}>
          <li className='signup-input_wrap'>
            <label htmlFor='email'>이메일</label>
            <input
              id='email'
              type='email'
              placeholder='이메일을 입력해주세요'
              autoComplete='off'
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email ? 'border-error' : ''}
            />
            {errors.email && <span className='failure-message'>{errors.email}</span>}
          </li>
          <li className='signup-input_wrap'>
            <label htmlFor='nickname'>닉네임</label>
            <input
              id='nickname'
              type='text'
              placeholder='닉네임을 입력해주세요'
              autoComplete='off'
              value={form.nickname}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.nickname ? 'border-error' : ''}
            />
            {errors.nickname && <span className='failure-message'>{errors.nickname}</span>}
          </li>
          <li className='signup-input_wrap'>
            <label htmlFor='password'>비밀번호</label>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              placeholder='비밀번호를 입력해주세요'
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password ? 'border-error' : ''}
            />
            {errors.password && <span className='failure-message'>{errors.password}</span>}
            <div className='password_eye_wrap'>
              <input
                type='checkbox'
                id='password_eye_toggle'
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <label htmlFor='password_eye_toggle' className='eye_btn'></label>
            </div>
          </li>
          <li className='signup-input_wrap'>
            <label htmlFor='passwordConfirmation'>비밀번호 확인</label>
            <input
              id='passwordConfirmation'
              type={showPasswordCheck ? 'text' : 'password'}
              autoComplete='off'
              placeholder='비밀번호를 다시 한 번 입력해주세요'
              value={form.passwordConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.passwordConfirmation ? 'border-error' : ''}
            />
            {errors.passwordConfirmation && <span className='failure-message'>{errors.passwordConfirmation}</span>}
            <div className='pw_check_eye_wrap'>
              <input
                type='checkbox'
                id='pw_eye_toggle'
                checked={showPasswordCheck}
                onChange={togglePasswordCheckVisibility}
              />
              <label htmlFor='pw_eye_toggle' className='eye_btn2'></label>
            </div>
          </li>
          <button
            className={`signup-btn ${isSignupActive ? 'activated' : ''}`}
            type='submit'
            disabled={!isSignupActive}>
            회원가입
          </button>
        </form>
        <div className='easy_login'>
          <h4>간편 로그인하기</h4>
          <div className='easy_login_link'>
            <a href='http://www.google.com'>
              <Image src={google} alt='구글' />
            </a>
            <a href='http://kakaocorp.com/page/'>
              <Image src={kakao} alt='카카오톡' />
            </a>
          </div>
        </div>
      </main>
      <footer className='signup-footer'>
        이미 회원이신가요?
        <Link href='/login'>
          <span>로그인</span>
        </Link>
      </footer>
    </div>
  );
}
