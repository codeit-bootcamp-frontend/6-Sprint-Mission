import React, { useRef, useState } from 'react';
import Image from 'next/image';
import icSort from '@/public/images/icons/ic_sort.svg';
import icArrowDown from '@/public/images/icons/ic_arrow_down.svg';

type Props = {
  handleOrder: (sortType: 'like' | 'recent') => void;
};

export default function SelectOrder({ handleOrder }: Props) {
  const [isDisplay, setIsDisplay] = useState(false);
  const ulRef = useRef(null);
  const [title, setTitle] = useState('최신순');

  const handleButtonClick = () => {
    setIsDisplay(prevIsDisplay => !prevIsDisplay);
  };

  const handleNewestClick = () => {
    setTitle('최신순');
    setIsDisplay(false);
    handleOrder('recent');
  };

  const handleLikesClick = () => {
    setTitle('좋아요순');
    setIsDisplay(false);
    handleOrder('like');
  };

  return (
    <div>
      <button
        className='flex justify-center items-center w-[42px] h-[42px] rounded-xl border md:w-[130px] lg:w-[130px]'
        onClick={handleButtonClick}>
        <Image className='w-6 md:hidden lg:hidden' src={icSort} width={24} alt='목차 누르는 화살표 버튼' />
        <p className='flex gap-[14px] sm:hidden items-center justify-between'>
          <span className='text-cool-gray800'>{title}</span>
          <Image src={icArrowDown} alt='목차 누르는 화살표 버튼' />
        </p>
      </button>
      {isDisplay && (
        <ul className='absolute mt-1 bg-white sm:right-0' ref={ulRef}>
          <li>
            <button
              className='w-[130px] h-[42px] border rounded-t-xl border-cool-gray200'
              type='button'
              onClick={handleNewestClick}>
              최신순
            </button>
          </li>
          <li>
            <button
              className='w-[130px] h-[42px] border-b border-x rounded-b-xl border-cool-gray200'
              type='button'
              onClick={handleLikesClick}>
              좋아요순
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
