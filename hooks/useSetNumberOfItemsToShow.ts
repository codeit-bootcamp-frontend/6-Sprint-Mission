import { useEffect, useState } from "react";
import { TABLET_WIDTH, MOBILE_WIDTH } from "@/constants/screenSizes";

interface PropType {
  desktop: number;
  tablet: number;
  mobile: number;
}
type useSetNumOfItemsToShowType = (prop: PropType) => number;

const useSetNumOfItemsToShow: useSetNumOfItemsToShowType = ({
  desktop,
  tablet,
  mobile,
}) => {
  const numberOfItems = [desktop, tablet, mobile];
  const [numOfItemsToShow, setsNumOfItemsToShow] = useState(numberOfItems[2]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > TABLET_WIDTH) {
        setsNumOfItemsToShow(numberOfItems[0]);
      } else if (window.innerWidth > MOBILE_WIDTH) {
        setsNumOfItemsToShow(numberOfItems[1]);
      } else {
        setsNumOfItemsToShow(numberOfItems[2]);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return numOfItemsToShow;
};

export default useSetNumOfItemsToShow;
