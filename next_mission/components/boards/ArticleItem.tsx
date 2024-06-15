import { Article } from '@/types/articleTypes';
import Image from 'next/image';
import Link from 'next/link';
import LikeCount from '../ui/LikeCount';
import { format } from 'date-fns';

// Todo : LikeCount gap 동적으로 입력하기

interface ArticleProps {
  article: Article;
}

const ArticleItem: React.FC<ArticleProps> = ({ article }) => {
  const dateString = format(article.createdAt, 'yyyy. MM. dd');
  return (
    <>
      <Link
        href={`/boards/${article.id}`}
        className="flex flex-col gap-6 h-[136px] border-b border-[#e5e7eb]"
      >
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex justify-between gap-8 h-[72px]">
            <h2 className="text-xl font-semibold text-[#1f2937]">
              {article.title}
            </h2>
            {article.image && (
              <div className="w-[72px] h-[72px] rounded-md border border-[#e5e7eb] relative">
                <Image
                  fill
                  src={article.image}
                  alt={`${article.id}번 게시글 이미지`}
                  className="object-contain w-12 h-11 absolute"
                />
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <span>아바타</span>
              <div className="flex gap-2 h-[17px] text-[#4b5563] text-sm">
                {article.writer.nickname}
                <span className="text-[#9ca3af] text-sm">{dateString}</span>
              </div>
            </div>
            <LikeCount
              count={article.likeCount}
              width={24}
              height={24}
              gap={8}
              leading={24}
              fontSize={16}
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default ArticleItem;
