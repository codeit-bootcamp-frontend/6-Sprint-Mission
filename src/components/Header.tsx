import React, { useContext } from 'react';
import style from '../../styles/Header.module.css';
import logo from '../img/panda.png';
import profile from '../img/profile.png';
import Link from 'next/link';

interface headerProps {
  isLogin: boolean;
  children: React.ReactNode;
}

const Header = ({ isLogin, children }: headerProps) => {
  return (
    <>
      <div className={style['nav']}>
        <div className={style['leftBtn']}>
          <Link href={'/'}>
            <img className='logo' src={logo.src} alt='로고' />
          </Link>
          <p>자유게시판</p>
          <p id='presentPage'>중고마켓</p>
        </div>
        <div className={style['rightBtn']}>
          {isLogin ? (
            <button>
              <img src={profile.src} alt='profile'></img>
            </button>
          ) : (
            <button className={style['loginBtn']}>로그인</button>
          )}
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;

