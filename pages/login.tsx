import Link from 'next/link';
import Image from 'next/image';
import imgLogoBig from '@/public/images/img_logo_big.png';
import google from '@/public/images/google.png';
import kakao from '@/public/images/kakao.png';
import LoginForm from '@/components/login-form';

export default function Login() {
  return (
    <div className='mx-auto mt-16 mb-[198px] w-mobile md:w-[640px] lg:w-[640px]'>
      <Link href='/'>
        <Image src={imgLogoBig} alt='판다마켓 로고' className='mx-auto mb-8 w-[198px] md:w-[300px] lg:w-[300px]' />
      </Link>
      <LoginForm />
      <div className='h-[74px] flex items-center justify-between px-6 mt-6 rounded-lg bg-sky-blue100'>
        <h4 className='font-medium text-gray-700'>간편 로그인하기</h4>
        <div className='flex gap-4'>
          <a href='http://www.google.com'>
            <Image src={google} alt='구글' width={40} height={40} />
          </a>
          <a href='http://kakaocorp.com/page/'>
            <Image src={kakao} alt='카카오톡' width={40} height={40} />
          </a>
        </div>
      </div>

      <footer className='mt-6 text-center text-gray-700'>
        판다마켓이 처음이신가요? &nbsp;
        <Link href='/signup' className='text-blue-500 underline'>
          회원가입
        </Link>
      </footer>
    </div>
  );
}
