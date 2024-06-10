import { useState, useEffect } from 'react';

export default function useBreakpoint() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);
      setIsTablet(screenWidth >= 768 && screenWidth < 1024);
      setIsDesktop(screenWidth >= 1024);
    };

    // 창 크기 조절 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 초기 호출
    handleResize();

    // 이벤트 리스너 정리
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
}