import { debounce } from "lodash";
import { useEffect, useState } from "react";

/**
 * S: ~ 479px,
 * M: 480px ~ 744px,
 * L: 745px ~,
 */

const getWindowSizeCategory = (width: number) => {
  if (width < 480) {
    return "S";
  } else if (width < 745) {
    return "M";
  } else {
    return "L";
  }
};

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState("");

  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      const category = getWindowSizeCategory(width);
      setWindowWidth(category);
    }, 100);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return windowWidth;
};

export default useWindowSize;
