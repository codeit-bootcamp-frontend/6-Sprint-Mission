import React, { useEffect, useState } from 'react';
import style from './styles.module.scss';
// import SigninForm from '../../components/SigninForm';
import PandaMarketLogoLarge from '../../public/icon/logo-lg.svg';
import PandaMarketLogoSmall from '../../public/icon/logo-sm.svg';
import { debounce } from '../lib/debounce';

export default function Signup() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const debouncedHandleResize = debounce(handleResize, 300);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [windowWidth]);

  return (
    <div className={style.container}>
      {windowWidth > 376 ? <PandaMarketLogoLarge /> : <PandaMarketLogoSmall />}
      {/* <SigninForm /> */}
    </div>
  );
}
