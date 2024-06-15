import { ChangeEvent, useState } from 'react';
import Comment from './Comment';

const COMMENT_PLACEHOLDER =
  '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.';

interface ItemCommentSectionProps {
  productId: number;
}

const ItemCommentSection: React.FC<ItemCommentSectionProps> = ({
  productId,
}) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {};

  return (
    <section>
      <h1>문의하기</h1>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder={COMMENT_PLACEHOLDER}
      />
      <button
        onClick={handlePostComment}
        disabled={!comment.trim()}
        className="cursor-pointer"
      >
        등록
      </button>

      <Comment productId={productId} />
    </section>
  );
};

export default ItemCommentSection;
