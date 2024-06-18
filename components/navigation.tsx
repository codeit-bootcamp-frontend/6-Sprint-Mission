import Link from 'next/link';
import Image from 'next/image';
import imgLogo from '@/public/images/img_logo.png';
import textLogo from '@/public/images/text_logo.png';
import icProfile from '@/public/images/icons/ic_profile.png';
import SelectBox from './select-box';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

export default function Navigation() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isDisplay, setIsDisplay] = useState(false);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsDisplay(!isDisplay);
        console.log(isDisplay);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectBoxRef, isDisplay]);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    setAccessToken(token);
  }, []);

  const freeBoardActive = router.pathname.startsWith('/boards');
  const isUsedMarketActive = router.pathname === '/items' || router.pathname.startsWith('/items');

  const handleLogoutClick = () => {
    setAccessToken(null);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    router.push('/');
  };

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
          {accessToken ? (
            <div className='flex gap-2 md:gap-0 lg:gap-0'>
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
            </div>
          ) : null}
        </div>

        <div className='flex items-center'>
          {accessToken ? (
            <>
              <Image
                ref={profileRef}
                className='cursor-pointer'
                src={icProfile}
                width={40}
                alt='프로필 기본 이미지'
                onClick={() => {
                  setIsDisplay(prev => !prev);
                  console.log(isDisplay);
                }}
              />
              {isDisplay ? (
                <div ref={selectBoxRef} className='relative z-50 top-6'>
                  <SelectBox
                    firstButtonName={'마이페이지'}
                    secondButtonName={'로그아웃'}
                    handleFirstButton={() => {
                      router.push('/mypage');
                    }}
                    handleSecondButton={handleLogoutClick}
                    isDisplay={isDisplay}
                  />
                </div>
              ) : (
                ''
              )}
            </>
          ) : (
            <button
              className='w-[128px] h-12 px-5 py-3 font-semibold text-white rounded-lg bg-brand-blue'
              onClick={() => {
                router.push('/login');
              }}>
              로그인
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
