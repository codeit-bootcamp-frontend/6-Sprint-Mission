import Image from "next/image";
import ic_kabab from "@/images/ic_kebab.svg";

interface KebabButtonProp {
  width: number;
  height: number;
}

const KebabButton = ({ width = 24, height = 24 }: KebabButtonProp) => {
  return (
    <Image
      src={ic_kabab}
      alt="메뉴 아이콘"
      width={width}
      height={height}
      style={{ cursor: "pointer" }}
    />
  );
};

export default KebabButton;
