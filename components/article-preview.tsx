import getFormatDate from '@/lib/utils/date';
import Image from 'next/image';
import icProfile from '@/public/images/icons/ic_profile.png';
import HeartButton from './heart-button';
import type { ArticleProps } from '@/types';
type ArticleDetailProps = ArticleProps & { articleId: number };

export default function ArticleDetail({
  createdAt,
  image,
  likeCount,
  title,
  writer,
  isLiked,
  articleId,
}: ArticleDetailProps) {
  const createdDate = getFormatDate(createdAt);
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-2 font-semibold text-cool-gray800'>
        <p className='min-h-[48px] min-w-[263px] sm: w-[263px] md:w-[616px] lg:w-[1120px] leading-5'>{title}</p>
        {image && (
          <div className='flex justify-center items-center bg-white border border-solid rounded-md border-cool-gray200 w-[72px] h-[72px]'>
            <Image src={image} alt='게시글 이미지' width={48} height={45} />
          </div>
        )}
      </div>
      <div className='flex justify-between pb-6 border-b border-solid text-cool-gray400 border-cool-gray200'>
        <div className='flex items-center gap-2'>
          <Image src={icProfile} alt='프로필 이미지' width={24} />
          <span className='text-cool-gray600'>{writer.nickname}</span>
          <time>{createdDate}</time>
        </div>
        <div className='flex items-center gap-1'>
          <HeartButton toggle={false} isLiked={isLiked} articleId={articleId.toString()} likeCount={likeCount} />
        </div>
      </div>
    </div>
  );
}
