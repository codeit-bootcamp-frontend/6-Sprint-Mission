import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from '@/lib/axios';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Image from 'next/image';
import Button from '@/components/Button';
import Container from '@/components/Container';

import LOGO_TEXT from '@/public/title-pandamarket.svg';
import LOGO_IMG from '@/public/logo-pandamarket.svg';
import SOCIAL_BTN_GOOGLE from '@/public/icon-google.svg';
import SOCIAL_BTN_KAKAO from '@/public/icon-kakao.svg';
import ICON_VISIBILITY from '@/public/icon-visibility.svg';
import ICON_INVISIBILITY from '@/public/icon-invisibility.svg';

type TInputs = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email('유효한 이메일 주소를 입력해주세요.')
    .required('이메일을 입력해주세요.'),
  nickname: yup.string().required('닉네임을 입력해주세요.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
  passwordConfirmation: yup
    .string()
    .required('비밀번호 확인을 입력해주세요.')
    .test('passwords-match', '비밀번호가 일치하지 않습니다.', function (value) {
      return this.parent.password === value;
    }),
});

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<TInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const password = watch('password');
  const passwordConfirmation = watch('passwordConfirmation');

  useEffect(() => {
    trigger('passwordConfirmation');
  }, [password, passwordConfirmation, trigger]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      window.alert('이미 로그인된 상태입니다.');
      router.push('/');
    }
  }, [router]);

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    try {
      await axios.post('/auth/signUp', data);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Container>
        <Link href="/">
          <div className="flex items-center justify-center gap-[20px] my-[50px]">
            <Image
              src={LOGO_IMG}
              alt="판다마켓 로고"
              width={100}
              style={{ height: 'auto' }}
              priority
            />
            <Image
              src={LOGO_TEXT}
              alt="판다마켓 로고"
              width={266}
              style={{ height: 'auto' }}
              priority
            />
          </div>
        </Link>
        <form
          className="flex flex-col gap-[25px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block mb-[10px] font-bold text-[#1f2937]">
              이메일
            </label>
            <input
              className={`w-[100%] bg-[#f3f4f6] h-[56px] px-[30px] rounded-xl text-[16px] ${
                errors.email && 'border-2 border-[#f74747]'
              }`}
              placeholder="이메일을 입력해주세요"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-[#f74747] font-semibold text-[15px] mt-[10px]">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-[10px] font-bold text-[#1f2937]">
              닉네임
            </label>
            <input
              className={`w-[100%] bg-[#f3f4f6] h-[56px] px-[30px] rounded-xl text-[16px] ${
                errors.nickname && 'border-2 border-[#f74747]'
              }`}
              placeholder="닉네임을 입력해주세요"
              autoComplete="username"
              {...register('nickname')}
            />
            {errors.nickname && (
              <p className="text-[#f74747] font-semibold text-[15px] mt-[10px]">
                {errors.nickname.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-[10px] font-bold text-[#1f2937]">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className={`w-[100%] bg-[#f3f4f6] h-[56px] px-[30px] rounded-xl text-[16px] ${
                  errors.password && 'border-2 border-[#f74747]'
                }`}
                placeholder="비밀번호를 입력해주세요"
                {...register('password')}
              />
              <Image
                className="absolute top-[15px] right-[15px] cursor-pointer"
                src={showPassword ? ICON_INVISIBILITY : ICON_VISIBILITY}
                alt="비밀번호 보이기"
                style={{ width: 'auto', height: 'auto' }}
                onClick={handleShowPassword}
              />
              {errors.password && (
                <p className="text-[#f74747] font-semibold text-[15px] mt-[10px]">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-[10px] font-bold text-[#1f2937]">
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className={`w-[100%] bg-[#f3f4f6] h-[56px] px-[30px] rounded-xl text-[16px] ${
                  errors.passwordConfirmation &&
                  passwordConfirmation.length > 0 &&
                  'border-2 border-[#f74747]'
                }`}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                {...register('passwordConfirmation')}
              />
              <Image
                className="absolute top-[15px] right-[15px] cursor-pointer"
                src={showPassword ? ICON_INVISIBILITY : ICON_VISIBILITY}
                alt="비밀번호 보이기"
                style={{ width: 'auto', height: 'auto' }}
                onClick={handleShowPassword}
              />
              {errors.passwordConfirmation &&
                passwordConfirmation.length > 0 && (
                  <p className="text-[#f74747] font-semibold text-[15px] mt-[10px]">
                    {errors.passwordConfirmation.message}
                  </p>
                )}
            </div>
          </div>
          <div className="h-[56px] rounded-[40px] overflow-hidden">
            <Button type="submit" disabled={!isValid}>
              회원가입
            </Button>
          </div>
          <div className="h-[74px] flex items-center justify-between rounded-lg bg-[#e6f2ff] p-[24px]">
            <p className="text-[#1f2937] font-medium">간편 로그인하기</p>
            <div className="flex gap-[15px]">
              <Image
                src={SOCIAL_BTN_GOOGLE}
                alt="구글 로그인"
                style={{ width: 'auto', height: 'auto' }}
              />
              <Image
                src={SOCIAL_BTN_KAKAO}
                alt="카카오 로그인"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <p>
              이미 회원이신가요?{' '}
              <Link href="/login">
                <span className="font-semibold underline text-[#3182f6]">
                  로그인
                </span>
              </Link>
            </p>
          </div>
        </form>
      </Container>
    </div>
  );
}

Signup.hideHeader = true;
