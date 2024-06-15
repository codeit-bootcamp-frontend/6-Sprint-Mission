import Link from 'next/link';
import MedalIcon from '@/public/images/icons/ic_medal.svg';
import Image from 'next/image';
import { Article } from '@/types/articleTypes';
import { format } from 'date-fns';
import LikeCount from '../ui/LikeCount';

const BestArticleCard = ({ article }: { article: Article }) => {
  const dateString = format(article.createdAt, 'yyyy. MM. dd');
  return (
    <Link
      href={`/boards/${article.id}`}
      className="w-[384px] h-[169px] bg-[#F9FAFB] rounded-lg"
    >
      <div className="flex flex-col gap-3 w-[336px] h-[153px] m-auto">
        <div className="flex gap-1 items-center w-[102px] h-[30px] bg-[#3692FF] justify-center text-white rounded-b-3xl text-base font-semibold">
          <MedalIcon width={16} height={16} />
          Best
        </div>

        <div className="flex w-[336px] h-[72px] gap-3">
          <h2 className="w-[256px] font-semibold text-xl text-[#1f2937]">
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

        <div className="flex justify-between">
          <div className="flex gap-2 items-center text-[#4b5563] font-normal h-4 text-sm">
            {article.writer.nickname}
            <LikeCount count={article.likeCount} fontSize={14} />
          </div>
          <span>{dateString}</span>
        </div>
      </div>
    </Link>
  );
};

export default BestArticleCard;
