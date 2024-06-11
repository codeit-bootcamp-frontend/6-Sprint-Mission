import { useEffect, useState } from "react";
import { debounce } from "./debounce";

export const useScreenDetector = () => {
  const [screen, setScreen] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const handleWindowSizeChange = () => {
    if (window.innerWidth <= 744)
      setScreen((prev) => ({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
      }));
    else if (window.innerWidth > 1200)
      setScreen((prev) => ({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      }));
    else
      setScreen((prev) => ({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
      }));
  };

  useEffect(() => {
    window.addEventListener("resize", debounce(handleWindowSizeChange, 100));
    return () => {
      window.removeEventListener(
        "resize",
        debounce(handleWindowSizeChange, 100),
      );
    };
  }, []);

  return screen;
};
