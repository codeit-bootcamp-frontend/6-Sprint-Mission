import { ProductComment } from '@/types/commentTypes';
import { formatUpdatedAt } from '@/utils/dateUtils';

interface CommentItemProps {
  item: ProductComment;
}

const CommentItem: React.FC<CommentItemProps> = ({ item }) => {
  const authorInfo = item.writer;
  const formattedTimestamp = formatUpdatedAt(item.updatedAt);
  return (
    <>
      <div>
        {/* 추후 추가 */}
        <button>더보기</button>

        <p>{item.content}</p>
        <div>
          <img
            src={authorInfo.image}
            alt={`${authorInfo.nickname}님의 프로필 사진`}
          />

          <div className="flex flex-col">
            <p>{authorInfo.nickname}</p>
            <p>{formattedTimestamp}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentItem;
