import { IArticleComment } from '@/interface/interface';
import Image from 'next/image';
import IMG_PROFILE from '@/public/profile.svg';
import { formatDate } from '@/utils/utils';

function Comment({ content, createdAt, updatedAt, writer }: IArticleComment) {
  return (
    <div className="border-b pt-[20px]">
      <p className="text-[14px] text-[#1f2937]">{content}</p>
      <div className="flex gap-[10px]">
        <Image src={IMG_PROFILE} alt="프로필 이미지" />
        <div className="py-[20px]">
          <p className="text-[12px] text-[#4B5563]">{writer.nickname}</p>
          <p className="text-[12px] text-[#9ca3af]">{formatDate(updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}
interface CommentsListProps {
  commentsList: IArticleComment[];
}

export default function CommentsList({ commentsList }: CommentsListProps) {
  return (
    <div>
      {commentsList?.map((comment) => (
        <Comment key={`comment-${comment.id}`} {...comment} />
      ))}
    </div>
  );
}
