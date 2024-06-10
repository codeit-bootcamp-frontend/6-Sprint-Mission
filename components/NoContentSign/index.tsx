import Image, { StaticImageData } from "next/image";
import React from "react";

interface NoContentSignProp {
  image: StaticImageData;
  children: string;
  imageWidth: number;
  imageHeight: number;
}
const NoContentSign = ({
  image,
  imageWidth,
  imageHeight,
  children,
}: NoContentSignProp) => {
  return (
    <div className="flex flex-col gap-[0.7rem] items-center whitespace-pre-wrap">
      <Image
        src={image}
        alt="안내 사진"
        width={imageWidth}
        height={imageHeight}
      />
      <p className="text-center font-normal text-[1.6rem] leading-[2.4rem] text-gray-400">
        {children}
      </p>
    </div>
  );
};

export default NoContentSign;
