import Image from 'next/image';
import Link from 'next/link';

import { IArticle } from '@/interface/interface';
import { formatDate } from '@/utils/utils';

import IMG_BADGE_BEST from '@/public/img-badge-best.svg';
import ICON_HEART from '@/public/icon-heart.svg';

interface BestArticleItemProps {
  article: IArticle;
}

export default function BestArticleItem({ article }: BestArticleItemProps) {
  const { id, title, image, writer, likeCount, updatedAt } = article;

  const imageWrapperClassName =
    'w-[72px] h-[72px] rounded-lg border border-[#E5E5EB] flex items-center justify-center';

  return (
    <div className="flex-shrink-0 border box-border lg:w-[384px] md:w-[49%] sm:w-[100%] h-[169px] rounded-xl">
      <Link href={`board/${id}`}>
        <Image
          className="ml-[25px]"
          src={IMG_BADGE_BEST}
          alt="베스트 게시글 뱃지 이미지"
        />
        <div className="flex justify-between mt-[10px] pl-[20px] pr-[20px]">
          <h1 className="text-[20px] flex-1 text-[#1f2937] font-semibold ">
            {title}
          </h1>
          {image ? (
            <div className={imageWrapperClassName}>
              <Image
                src={image}
                alt="게시글 썸네일 이미지"
                width={50}
                height={50}
                style={{ width: 50, height: 50 }}
              />
            </div>
          ) : (
            <div className={imageWrapperClassName}>
              <p className="text-[12px] text-[#9ca3af]">이미지 없음</p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-[20px] pl-[20px] pr-[20px]">
          <div className="flex items-center gap-[5px]">
            <p className="text-[14px] text-[#4b5563]">{writer.nickname}</p>
            <Image src={ICON_HEART} alt="좋아요 버튼" width={20} />
            <p className="text-[16px] text-[#6b7280]">{likeCount}</p>
          </div>
          <p className="text-[14px] text-[#9ca3af]">{formatDate(updatedAt)}</p>
        </div>
      </Link>
    </div>
  );
}
