import Image from 'next/image';
import icHeart from '@/public/images/icons/ic_heart.png';
import icProfile from '@/public/images/icons/ic_profile.png';
import icKebab from '@/public/images/icons/ic_kebab.svg';
import getFormatDate from '@/lib/utils/formatDate';
import { ArticleProps } from '@/types';

export default function ArticleDetail({ content, createdAt, image, likeCount, title, writer }: ArticleProps) {
  const createdDate = getFormatDate(createdAt);

  return (
    <>
      <div className='flex justify-between mb-4'>
        <h1 className=''>{title}</h1>
        <Image src={icKebab} width={24} alt='케밥 메뉴' />
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
            <Image src={icHeart} width={24} height={24} alt='좋아요 하트' />

            {likeCount}
          </div>
        </div>

        <div className='w-[343px] md:w-[696px] lg:w-[1200px] h-[1px] bg-cool-gray200 mb-4'></div>
        <div>{content}</div>
      </div>
    </>
  );
}
