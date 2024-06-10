import React from "react";
import Image from "next/image";
import ic_back from "@/images/ic_back.svg";
import { useRouter } from "next/router";

const BackToListButton = () => {
  const router = useRouter();

  return (
    <button
      className="w-[24rem] h-[4.8rem] bg-[#3692FF] rounded-[4rem] border-none flex justify-center items-center gap-[1rem] cursor-pointer"
      onClick={() => {
        router.push("/boards");
      }}
    >
      <span className="font-semibold text-[1.8rem] leading-[2.4rem] text-white">
        목록으로 돌아가기
      </span>
      <Image src={ic_back} alt="목록으로 돌아가기" width={24} height={24} />
    </button>
  );
};

export default BackToListButton;
