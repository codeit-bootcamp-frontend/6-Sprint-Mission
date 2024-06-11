import Link from 'next/link';
import Image from 'next/image';
import imgLogo from '@/public/images/img_logo.png';
import textLogo from '@/public/images/text_logo.png';
import icProfile from '@/public/images/icons/ic_profile.png';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
    setIsChecked(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };

    handleRouteChange();

    const handleStorageChange = () => {
      handleRouteChange();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const freeBoardActive = router.pathname.startsWith('/boards');
  const isUsedMarketActive = router.pathname === '/' || router.pathname.startsWith('/items');

  if (!isChecked) {
    return null;
  }

  return (
    <nav className='flex justify-center items-center h-[70px] border-b border-solid border-[#DFDFDF]'>
      <div className='flex w-[1200px] justify-between px-4'>
        <div className='flex items-center'>
          <Link href='/'>
            <div className='pr-4'>
              <Image className='md:hidden lg:hidden' src={textLogo} width={81} alt='판다마켓로고' />
              <Image className='sm:hidden md:block' src={imgLogo} width={153} alt='판다마켓로고' />
            </div>
          </Link>
          {isLoggedIn && (
            <>
              <Link href='/boards'>
                <button
                  className={`font-bold block h-[70px] sm:w-[73px] md:w-[109px] lg:w-[109px] text-[#4B5563] ${
                    freeBoardActive ? 'text-brand-blue' : ''
                  }`}>
                  자유게시판
                </button>
              </Link>
              <Link href='/'>
                <button
                  className={`font-bold block h-[70px] sm:w-[58px] md:w-[109px] lg:w-[109px] text-[#4B5563] ${
                    isUsedMarketActive ? 'text-brand-blue' : ''
                  }`}>
                  중고마켓
                </button>
              </Link>
            </>
          )}
        </div>

        <div className='flex items-center'>
          {isLoggedIn ? (
            <div onClick={handleLogoutClick}>
              <Image src={icProfile} width={40} alt='프로필 기본 이미지' />
            </div>
          ) : (
            <button
              className='w-[128px] h-12 px-5 py-3 font-semibold text-white rounded-lg bg-brand-blue'
              onClick={handleLoginClick}>
              로그인
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
