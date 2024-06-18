import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { joinValidationSchema } from '@/lib/utils/validation/schema';
import Image from 'next/image';
import closedEye from '@/public/images/icons/ic_closed-eye.svg';
import openEye from '@/public/images/icons/ic_open-eye.svg';
import { useRouter } from 'next/router';
import { loginUser } from '@/lib/api/user';
import { useState } from 'react';

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      const response = await loginUser(data.email, data.password);
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

      <button
        className={`py-3 rounded-[40px] text-white font-semibold mt-4 ${isValid ? 'bg-brand-blue' : 'bg-cool-gray400'}`}
        title='로그인'
        disabled={!isValid}
        onSubmit={handleSubmit(onSubmit)}>
        로그인
      </button>
    </form>
  );
}
