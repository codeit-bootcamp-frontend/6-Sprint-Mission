import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface Responsive {
  isPc: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

function useResponsive(): Responsive {
  const [isPc, setIsPc] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // 초기값을 모바일로 설정

  const pcQuery = useMediaQuery({ query: "(min-width: 1280px)" });
  const tabletQuery = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1280px)",
  });
  const mobileQuery = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    setIsPc(pcQuery);
    setIsTablet(tabletQuery);
    setIsMobile(mobileQuery);
  }, [pcQuery, tabletQuery, mobileQuery]);

  return { isPc, isTablet, isMobile };
}

export default useResponsive;
