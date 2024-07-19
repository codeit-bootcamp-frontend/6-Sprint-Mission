/* eslint-disable no-alert */
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/images/logo/logo.svg';
import Google from '@/public/images/social/google-logo.png';
import Kakao from '@/public/images/social/kakao-logo.png';
import Eyes from '@/public/images/icons/eye-visible.svg';
import NoEyes from '@/public/images/icons/eye-invisible.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';

interface Signup {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUpPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>({ mode: 'all' });
  const [showedPW, SetShowedPW] = useState<boolean>(false);
  const [showedPWCheck, SetShowedPWCheck] = useState<boolean>(false);
  const router = useRouter();
  const formValues = watch();
  const isFormValid =
    formValues.email &&
    formValues.nickname &&
    formValues.password &&
    formValues.passwordConfirmation;

  const onSubmit: SubmitHandler<Signup> = async ({
    email,
    nickname,
    password,
    passwordConfirmation,
  }: Signup) => {
    await axios
      .post('auth/signUp', {
        email,
        nickname,
        password,
        passwordConfirmation,
      })
      .then(() => {
        alert('회원가입성공');
        router.replace('/login');
      })
      .catch(() => {
        alert('회원가입실패');
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center">
      <Link href="/">
        <Image
          className="mb-[40px] mt-[60px] h-[132px] w-[396px]"
          src={Logo}
          alt="회원가입 페이지 로고"
        />
      </Link>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col">
          <label
            htmlFor="email"
            className="mb-[16px] text-[18px] font-bold leading-[21px]"
          >
            이메일
          </label>

          <input
            {...register('email', {
              required: { value: true, message: '이메일을 입력해주세요' },
              pattern: {
                value: /^\S+@\S+$/i,
                message: '잘못된 이메일 형식입니다',
              },
            })}
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            className={`mb-[30px] h-[56px] w-[640px] rounded-[12px] bg-gray-200 px-[24px] py-[16px] text-[16px] font-normal leading-[24px] outline-none outline-offset-0 ${errors.email ? 'outline-red-error' : 'outline-blue-active'}`}
          />
          {errors?.email?.message && (
            <p className="absolute left-[10px] top-[100px] mr-[8px] text-[15px] font-semibold leading-[18px] text-red-error">
              {errors?.email?.message}
            </p>
          )}
        </div>

        <div className="relative flex flex-col">
          <label
            htmlFor="nickname"
            className="mb-[16px] text-[18px] font-bold leading-[21px]"
          >
            닉네임
          </label>
          <input
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
            })}
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            className={`mb-[30px] h-[56px] w-[640px] rounded-[12px] bg-gray-200 px-[24px] py-[16px] text-[16px] font-normal leading-[24px] outline-none outline-offset-0 ${errors.nickname ? 'outline-red-error' : 'outline-blue-active'}`}
          />
          {errors?.nickname?.message && (
            <p className="absolute left-[10px] top-[100px] mr-[8px] text-[15px] font-semibold leading-[18px] text-red-error">
              {errors?.nickname?.message}
            </p>
          )}
        </div>

        <div className="relative flex flex-col">
          <label
            htmlFor="password"
            className="mb-[16px] text-[18px] font-bold leading-[21px]"
          >
            비밀번호
          </label>
          <input
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: { value: 8, message: '8자리 이상 입력해주세요' },
            })}
            type={showedPW ? 'text' : 'password'}
            id="password"
            placeholder="비밀번호를 입력해주세요"
            className={`mb-[30px] h-[56px] w-[640px] rounded-[12px] bg-gray-200 px-[24px] py-[16px] text-[16px] font-normal leading-[24px] outline-none outline-offset-0 ${errors.password ? 'outline-red-error' : 'outline-blue-active'}`}
          />
          {showedPW ? (
            <Image
              src={Eyes}
              alt="보이기"
              width={24}
              height={24}
              className="absolute right-[24px] top-[53px] cursor-pointer"
              onClick={() => {
                SetShowedPW(!showedPW);
              }}
            />
          ) : (
            <Image
              src={NoEyes}
              alt="보이기"
              width={24}
              height={24}
              className="absolute right-[24px] top-[53px] cursor-pointer"
              onClick={() => {
                SetShowedPW(!showedPW);
              }}
            />
          )}
          {errors?.password?.message && (
            <p className="absolute left-[10px] top-[100px] mr-[8px] text-[15px] font-semibold leading-[18px] text-red-error">
              {errors?.password?.message}
            </p>
          )}
        </div>

        <div className="relative flex flex-col">
          <label
            htmlFor="checkpassword"
            className="mb-[16px] text-[18px] font-bold leading-[21px]"
          >
            비밀번호 확인
          </label>
          <input
            {...register('passwordConfirmation', {
              required: '비밀번호를 다시 한 번 입력해주세요',
              validate: (value) => value === formValues.passwordConfirmation,
            })}
            type={showedPWCheck ? 'text' : 'password'}
            id="checkpassword"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            className={`mb-[30px] h-[56px] w-[640px] rounded-[12px] bg-gray-200 px-[24px] py-[16px] text-[16px] font-normal leading-[24px] outline-none outline-offset-0 ${errors.passwordConfirmation ? 'outline-red-error' : 'outline-blue-active'}`}
          />
          {showedPWCheck ? (
            <Image
              src={Eyes}
              alt="보이기"
              width={24}
              height={24}
              className="absolute right-[24px] top-[53px] cursor-pointer"
              onClick={() => {
                SetShowedPWCheck(!showedPWCheck);
              }}
            />
          ) : (
            <Image
              src={NoEyes}
              alt="보이기"
              width={24}
              height={24}
              className="absolute right-[24px] top-[53px] cursor-pointer"
              onClick={() => {
                SetShowedPWCheck(!showedPWCheck);
              }}
            />
          )}
          {errors?.passwordConfirmation?.message && (
            <p className="absolute left-[10px] top-[100px] mr-[8px] text-[15px] font-semibold leading-[18px] text-red-error">
              {errors?.passwordConfirmation?.message}
            </p>
          )}
          {errors?.passwordConfirmation?.type === 'validate' && (
            <p className="absolute left-[10px] top-[100px] mr-[8px] text-[15px] font-semibold leading-[18px] text-red-error">
              비밀번호가 일치하지 않습니다
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="hover: h-[56px] w-[640px] cursor-pointer rounded-[40px] bg-blue-active text-[20px] font-semibold leading-[24px] text-white hover:bg-blue-hover disabled:bg-gray-400"
        >
          회원가입
        </button>
      </form>
      <div className="my-[24px] flex h-[74px] w-[640px] items-center justify-between rounded-[8px] bg-[#e6f2ff] px-[23px] py-[16px]">
        <p className="text-[16px] font-medium leading-[24px] text-gray-800">
          간편 로그인하기
        </p>
        <div className="flex gap-[16px]">
          <Image src={Google} alt="구글 로그인" width={42} height={42} />
          <Image src={Kakao} alt="카카오톡 로그인" width={42} height={42} />
        </div>
      </div>
      <div className="text-[15px] font-medium leading-[18px]">
        판다마켓이 처음이신가요?
        <Link href="/login">
          <span className="text-[#3182f6]">로그인</span>
        </Link>
      </div>
    </div>
  );
}
