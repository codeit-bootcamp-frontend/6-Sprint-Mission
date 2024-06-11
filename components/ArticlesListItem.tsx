import Image from 'next/image';
import { IArticle } from '@/interface/interface';
import { formatDate } from '@/utils/utils';
import IMG_PROFILE from '@/public/profile.svg';
import ICON_HEART from '@/public/icon-heart.svg';

interface ArticleListItemProps {
  article: IArticle;
}

export default function ArticleListItem({ article }: ArticleListItemProps) {
  const { title, image, writer, likeCount, createdAt, updatedAt } = article;

  const imageWrapperClassName =
    'w-[72px] h-[72px] rounded-lg border border-[#E5E5EB] flex items-center justify-center';

  return (
    <div className="border-b mt-[20px] cursor-pointer">
      <div className="flex justify-between mb-[30px]">
        <h1 className="text-[20px] text-[#1f2937] font-semibold flex-1">
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
      <div className="flex justify-between mb-[20px]">
        <div className="flex items-center gap-[5px]">
          <Image
            src={IMG_PROFILE}
            alt="프로필 이미지"
            width={24}
            height={24}
            style={{ width: '24px', height: ' 24px' }}
          />
          <p className="text-[14px] text-[#4b5563]">{writer.nickname}</p>
          <p className="text-[14px] text-[#9ca3af]">
            {formatDate(updatedAt) +
              `${createdAt !== updatedAt ? ' (수정됨)' : ''}`}
          </p>
        </div>
        <div className="flex items-center gap-[5px]">
          <Image src={ICON_HEART} alt="좋아요 버튼" width={20} />
          <p className="text-[16px] text-[#6b7280]">{likeCount}</p>
        </div>
      </div>
    </div>
  );
}
