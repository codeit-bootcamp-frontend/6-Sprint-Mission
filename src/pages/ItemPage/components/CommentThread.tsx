import { useEffect, useState } from 'react';
import { getProductComments } from '../../../api/itemApi';
import styled from 'styled-components';
import { ReactComponent as EmptyStateImage } from '../../../assets/images/ui/empty-comments.svg';
import { Comments } from '../../../types/CommentTypes';
import CommentItem from './CommentItem';

const EmptyStateContainer = styled.div`
  margin: 24px;
  display: flex;
  flex-direction: column;
  align-items: center; // flex-direction이 column일 때는 main axis가 세로축이기 때문에 align-items: center; 를 적용해야 자식 요소들이 horizontally 가운데 정렬돼요.
  gap: 24px;
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 16px;
  line-height: 24px;
`;

// Empty States: 보여줄 데이터가 없을 때 placeholder 역할을 할 UI를 넣어주세요.
const EmptyState = () => {
  return (
    <EmptyStateContainer>
      <EmptyStateImage />
      <EmptyStateText>아직 문의가 없습니다.</EmptyStateText>
    </EmptyStateContainer>
  );
};

const ThreadContainer = styled.div`
  margin-bottom: 40px;
`;

type CommentThreadProps = {
  productId: number;
};

function CommentThread({ productId }: CommentThreadProps) {
  const [comments, setComments] = useState<Comments[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!productId) return;

    const fetchComments = async () => {
      setIsLoading(true);
      const params = {
        limit: 10, // 페이지당 보여줄 댓글 개수 (참고: 요구사항에 아직 댓글란 pagination 기능이 없기 때문에 임의로 10으로 설정했어요.)
      };

      try {
        const data = await getProductComments({ productId, params });
        setComments(data.list);
        setError('');
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('상품의 댓글을 불러오지 못했어요.' || '');
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
    return <div>오류: {error}</div>;
  }

  if (comments && !comments.length) {
    return <EmptyState />;
  } else {
    return (
      <ThreadContainer>
        {comments.map((item) => (
          <CommentItem item={item} key={`comment-${item.id}`} />
        ))}
      </ThreadContainer>
    );
  }
}

export default CommentThread;
