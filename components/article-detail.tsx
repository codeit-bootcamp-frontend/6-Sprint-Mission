import React, { useState, useRef } from 'react';
import Image from 'next/image';
import icProfile from '@/public/images/icons/ic_profile.png';
import icKebab from '@/public/images/icons/ic_kebab.svg';
import getFormatDate from '@/lib/utils/date';
import type { ArticleProps } from '@/types';
import SelectBox from './select-box';
import heartImg from '@/public/images/icons/ic_heart.svg';
import emptyHeartImg from '@/public/images/icons/ic_empty-heart.svg';

type Props = ArticleProps & {
  articleId: string;
  onLike: () => void;
};

export default function ArticleDetail({
  articleId,
  content,
  createdAt,
  image,
  likeCount,
  title,
  writer,
  isLiked,
  onLike,
}: Props): JSX.Element {
  const createdDate = getFormatDate(createdAt);
  const [selectBoxIsOpen, setSelectBoxIsOpen] = useState(false);
  const kebabRef = useRef<HTMLImageElement | null>(null);
  const dropdownList = [
    { label: '수정하기', onClick: () => {} },
    { label: '삭제하기', onClick: () => {} },
  ];

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
          onClick={() => setSelectBoxIsOpen(prev => !prev)}
        />
        {selectBoxIsOpen && (
          <span className='absolute top-7 right-2 md:top-4 lg:top-4'>
            <SelectBox items={dropdownList} setSelectBoxIsOpen={setSelectBoxIsOpen} exceptions={[kebabRef]} />
          </span>
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
            <Image
              src={isLiked ? heartImg : emptyHeartImg}
              alt={isLiked ? '꽉찬 하트' : '빈 하트'}
              width={20}
              height={20}
              onClick={onLike}
            />
            {likeCount}
          </div>
        </div>

        <div className='w-[343px] md:w-[696px] lg:w-[1200px] h-[1px] bg-cool-gray200 mb-4'></div>
        <div className='flex justify-between'>
          <div>{content}</div>
          <div>
            {image && <Image className='rounded-lg' src={image} width={200} height={200} alt='콘텐츠 이미지' />}
          </div>
        </div>
      </div>
    </>
  );
}
