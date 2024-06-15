//Next.js에서는 일반 리액트에서처럼 바로 window 객체를 사용하지 못하기 때문에 별도의 hooks를 작성
// why? Server-side rendering이 기본으로 동작

import { useEffect, useState } from 'react';

const useViewport = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [])

  return width;
}

export default useViewport;