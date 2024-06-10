import { useState, useEffect } from "react";

// 화면 크기를 감지하고 디바이스 타입을 반환하는 커스텀 훅
const useBreakPoint = () => {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      width < 768
        ? setDevice("mobile")
        : width >= 768 && width < 1024
        ? setDevice("tablet")
        : setDevice("desktop");
    };

    // 초기 화면 크기 설정
    handleResize();

    // 윈도우 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { device };
};

export default useBreakPoint;
