import Image from 'next/image';

import { formatDateToTimeAgo } from '@/utils/formatDateToString';

import { BoardComment } from '@/types/board';

type CommentProp = {
  comment: BoardComment;
};

export default function Comment({ comment }: CommentProp) {
  const { content, createdAt, writer } = comment;

  return (
    <div className="relative my-4 flex flex-col tablet:my-6">
      <Image
        src="/images/ic_kebab.svg"
        width={24}
        height={24}
        className="absolute right-0 top-0"
        alt="댓글 메뉴 아이콘"
      />
      <p className="text-sm font-normal text-gray-800">{content}</p>
      <div className="mt-4 flex items-center tablet:mt-6">
        <Image
          src={writer.image ?? '/images/img_default_profile.svg'}
          width={32}
          height={32}
          className="max-h-8 rounded-full"
          alt="댓글쓴이 프로필 이미지"
        />
        <div className="ml-2 flex flex-col">
          <p className="text-xs font-normal text-gray-600">{writer.nickname}</p>
          <p className="text-xs font-normal text-gray-400">
            {formatDateToTimeAgo(new Date(createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
}
