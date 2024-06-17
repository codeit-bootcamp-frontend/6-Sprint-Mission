import Image from "next/image";
import ic_heart from "@/images/ic_heart.svg";

interface HeartButtonProp {
  width: number;
  height: number;
  onClick?: () => void;
}

const HeartButton = ({ width, height, onClick }: HeartButtonProp) => {
  return (
    <button type="button" onClick={onClick}>
      <Image
        src={ic_heart}
        alt="하트 버튼"
        width={width}
        height={height}
        className="cursor-pointer"
      />
    </button>
  );
};

export default HeartButton;
