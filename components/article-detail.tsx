import Image from 'next/image';
import HeartButton from './heart-button';
import icProfile from '@/public/images/icons/ic_profile.png';
import icKebab from '@/public/images/icons/ic_kebab.svg';
import getFormatDate from '@/lib/utils/date';
import type { ArticleProps } from '@/types';
import { useState, useRef, useEffect } from 'react';
import SelectBox from './select-box';

type Props = ArticleProps & {
  onClick: () => void;
};

export default function ArticleDetail({
  content,
  createdAt,
  image,
  likeCount,
  title,
  writer,
  isLiked,
  onClick,
}: Props) {
  const createdDate = getFormatDate(createdAt);
  const [isDisplay, setIsDisplay] = useState(false);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);
  const kebabRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(event.target as Node) &&
        kebabRef.current &&
        !kebabRef.current.contains(event.target as Node)
      ) {
        setIsDisplay(!isDisplay);
        console.log(isDisplay);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectBoxRef, isDisplay]);
  return (
    <>
      <div className='relative flex justify-between mb-4'>
        <h1 className=''>{title}</h1>
        <Image
          ref={kebabRef}
          className='cursor-pointer'
          src={icKebab}
          width={24}
          alt='케밥 메뉴'
          onClick={() => {
            setIsDisplay(prev => !prev);
          }}
        />
        {isDisplay ? (
          <div ref={selectBoxRef} className='absolute top-6 right-2'>
            <SelectBox
              firstButtonName='글 수정하기'
              secondButtonName='글 삭제하기'
              handleFirstButton={() => {}}
              handleSecondButton={() => {}}
              isDisplay={isDisplay}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='mb-10'>
        <div className='flex items-center gap-4 mb-4'>
          <div className='flex items-center gap-2'>
            <Image src={icProfile} width={24} alt='프로필 기본 사진' />
            <span className='text-[14px] text-cool-gray600'>{writer.nickname}</span>
            <span className='text-[12px] text-cool-gray400'>{createdDate}</span>
          </div>

          <div className='w-[1px] h-[24px] bg-cool-gray200'></div>

          <div className='flex items-center gap-1 text-[14px] text-cool-gray600'>
            <HeartButton like={isLiked} onClick={onClick} />
            {likeCount}
          </div>
        </div>

        <div className='w-[343px] md:w-[696px] lg:w-[1200px] h-[1px] bg-cool-gray200 mb-4'></div>
        <div>{content}</div>
      </div>
    </>
  );
}
