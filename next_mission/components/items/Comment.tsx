import { getProductComments } from '@/api/itemApi';
import {
  ProductComment,
  ProductCommentListResponse,
} from '@/types/commentTypes';
import { useEffect, useState } from 'react';
import Empty from '../ui/Empty';
import CommentItem from './CommentItem';

interface CommentProps {
  productId: number;
}

const Comment: React.FC<CommentProps> = ({ productId }) => {
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchComments = async () => {
      setIsLoading(true);

      try {
        const res: ProductCommentListResponse = await getProductComments({
          productId,
        });
        setComments(res.list);
        setError(null);
      } catch (error) {
        console.error('댓글을 불러오는 데 실패했습니다.', error);
        setError('상품의 댓글을 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  if (isLoading) {
    return <div>상품 댓글 로딩중...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (comments && !comments.length) {
    return <Empty text="아직 문의가 없습니다. " />;
  } else {
    return (
      <div>
        {comments.map((item) => (
          <CommentItem item={item} key={`comment-${item.id}`} />
        ))}
      </div>
    );
  }
};

export default Comment;
