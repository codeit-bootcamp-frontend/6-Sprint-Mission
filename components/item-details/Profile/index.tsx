import React from 'react';
import Image from 'next/image';

type Props = {
  nickname: string;
  image: string;
  children: React.ReactNode;
};

export default function Profile({ image, nickname, children }: Props): JSX.Element {
  return (
    <div className='flex gap-[8px]'>
      <div className='w-[40px] h-[40px] text-center'>
        {image ? (
          <Image src={image} alt='프로필 이미지' className='object-cover w-full h-full' />
        ) : (
          <div className='w-full h-full pt-[6px] text-xl font-semibold text-white rounded-full bg-sky-200 '>
            {nickname[0]}
          </div>
        )}
      </div>
      <div className='flex flex-col font-[400] gap-[4px]'>
        <div className='text-[#4b5563] text-[14px]'>{nickname}</div>
        {children}
      </div>
    </div>
  );
}
