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

interface Login {
  email: string;
  password: string;
}

export default function LogInPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ mode: 'onBlur' });
  const router = useRouter();
  const [showedPW, SetShowedPW] = useState<boolean>(false);
  const formValues = watch();
  const isFormValid = formValues.email && formValues.password;

  const onSubmit: SubmitHandler<Login> = async ({ email, password }: Login) => {
    await axios
      .post('auth/signIn', {
        email,
        password,
      })
      .then((response) => {
        const accessToken = response.data?.accessToken;
        localStorage.setItem('accessToken', accessToken);
        alert('로그인 성공');
        router.push('/');
      })
      .catch(() => {
        alert('로그인 실패');
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
          alt="로그인 페이지 로고"
        />
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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

        <button
          type="submit"
          disabled={!isFormValid}
          className="hover: h-[56px] w-[640px] cursor-pointer rounded-[40px] bg-blue-active text-[20px] font-semibold leading-[24px] text-white hover:bg-blue-hover disabled:bg-gray-400"
        >
          로그인
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
        <Link href="/signup">
          <span className="text-[#3182f6]">회원가입</span>
        </Link>
      </div>
    </div>
  );
}
