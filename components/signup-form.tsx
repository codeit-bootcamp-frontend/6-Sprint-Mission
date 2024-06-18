import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { joinValidationSchema } from '@/lib/utils/validation/schema';
import { useRouter } from 'next/router';
import { signUpUser } from '@/lib/api/user';
import { useState } from 'react';
import closedEye from '../public/images/icons/ic_closed-eye.svg';
import openEye from '../public/images/icons/ic_open-eye.svg';
import Image from 'next/image';

type Inputs = {
  email: string;
  password: string;
  passwordConfirmation?: string;
  nickname?: string;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);

  const resolver = yupResolver(joinValidationSchema);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const response = await signUpUser(data.email, data.password, data.nickname, data.passwordConfirmation);
      if (response) {
        await router.replace('/login');
      }
      return response.data;
    } catch (e) {
      console.error(e);
      return alert('회원가입 실패ㅠㅠ');
    }
  };
  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='email' className='block mb-2 text-sm font-bold text-gray-700'>
        이메일
      </label>
      <input
        className={errors.email ? 'border border-red-500' : 'border-none'}
        placeholder='이메일을 입력해주세요'
        {...register('email', { required: true })}
      />
      <span className='pt-2 px-4 text-red-500 text-[15px] font-semibold'>{errors.email?.message}</span>

      <label htmlFor='nickname' className='block mt-4 mb-2 text-sm font-bold text-gray-700'>
        닉네임
      </label>
      <input
        className={errors.nickname ? 'border border-red-500' : 'border-none'}
        placeholder='닉네임을 입력해주세요'
        {...register('nickname', { required: true })}
      />
      <span className='pt-2 px-4 text-red-500 text-[15px] font-semibold'>{errors.nickname?.message}</span>

      <label htmlFor='password' className='block mt-4 mb-2 text-sm font-bold text-gray-700'>
        비밀번호
        <div className='relative'>
          <Image
            className='absolute top-[26px] right-[18px]'
            onClick={() => setShowPassword(prev => !prev)}
            width={24}
            src={showPassword ? openEye : closedEye}
            alt='감은 눈'
          />
        </div>
      </label>
      <input
        className={errors.password ? 'border border-red-500' : 'border-none'}
        type={showPassword ? 'text' : 'password'}
        placeholder='비밀번호를 입력해주세요'
        {...register('password', { required: true })}
      />
      <span className='pt-2 px-4 text-red-500 text-[15px] font-semibold'>{errors.password?.message}</span>

      <label htmlFor='passwordConfirmation' className='block mt-4 mb-2 text-sm font-bold text-gray-700'>
        비밀번호 확인
        <div className='relative'>
          <Image
            className='absolute top-[26px] right-[18px]'
            onClick={() => setShowPasswordConfirmation(prev => !prev)}
            width={24}
            src={showPasswordConfirmation ? openEye : closedEye}
            alt='감은 눈'
          />
        </div>
      </label>
      <input
        className={errors.passwordConfirmation ? 'border border-red-500' : 'border-none'}
        type={showPasswordConfirmation ? 'text' : 'password'}
        placeholder='비밀번호를 다시 한 번 입력해주세요'
        {...register('passwordConfirmation', { required: true })}
      />
      <span className='pt-2 px-4 text-red-500 text-[15px] font-semibold'>{errors.passwordConfirmation?.message}</span>

      <button
        className={`py-3 rounded-[40px] text-white font-semibold mt-4 ${isValid ? 'bg-brand-blue' : 'bg-cool-gray400'}`}
        title='회원가입'
        disabled={!isValid}
        onSubmit={handleSubmit(onSubmit)}>
        회원가입
      </button>
    </form>
  );
}
