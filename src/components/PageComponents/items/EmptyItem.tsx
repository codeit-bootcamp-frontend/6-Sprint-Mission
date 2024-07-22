import { EMPTY_POST_IMAGE } from "@/constants/defaultImages";
import Image from "next/image";
import React from "react";

const EmptyItem = () => {
  return (
    <div className="flexcenter mt-88 flex-col py-16 text-20 font-medium text-gray-500">
      <Image
        src={EMPTY_POST_IMAGE}
        alt="아무것도 없어요 u.u"
        width={140}
        height={140}
      />
      상품이 없어요
    </div>
  );
};

export default EmptyItem;
