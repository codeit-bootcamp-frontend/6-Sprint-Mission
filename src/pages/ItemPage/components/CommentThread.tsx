import React, { useEffect, useState } from "react";
import { getProductComments } from "../../../api/itemApi";
import styled from "styled-components";
import { ReactComponent as EmptyStateImage } from "../../../assets/images/ui/empty-comments.svg";
import { ReactComponent as SeeMoreIcon } from "../../../assets/images/icons/ic_kebab.svg";
import DefaultProfileImage from "../../../assets/images/ui/ic_profile.svg";
import { formatUpdatedAt } from "../../../utils/dateUtils";

const CommentContainer = styled.div`
  padding: 24px 0;
  position: relative;
`;

const SeeMoreButton = styled.button`
  position: absolute;
  right: 0;
`;

const CommentContent = styled.p`
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 24px;
`;

const AuthorProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Username = styled.p`
  color: var(--gray-600);
  font-size: 14px;
  margin-bottom: 4px;
`;

const Timestamp = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 12px;
`;

interface Comment {
  id: number;
  content: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image?: string;
  };
}

interface CommentItemProps {
  item: Comment;
}

const CommentItem = ({ item }: CommentItemProps) => {
  const authorInfo = item.writer;
  const formattedTimestamp = formatUpdatedAt(item.updatedAt);

  return (
    <>
      <CommentContainer>
        <SeeMoreButton>
          <SeeMoreIcon />
        </SeeMoreButton>

        <CommentContent>{item.content}</CommentContent>

        <AuthorProfile>
          <UserProfileImage
            src={authorInfo.image || DefaultProfileImage}
            alt={`${authorInfo.nickname}님의 프로필 사진`}
          />

          <div>
            <Username>{authorInfo.nickname}</Username>
            <Timestamp>{formattedTimestamp}</Timestamp>
          </div>
        </AuthorProfile>
      </CommentContainer>

      <hr />
    </>
  );
};

const EmptyStateContainer = styled.div`
  margin: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 16px;
  line-height: 24px;
`;

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

interface CommentThreadProps {
  productId: string;
}

function CommentThread({ productId }: CommentThreadProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchComments = async () => {
      setIsLoading(true);
      const params = {
        limit: "10", // 숫자를 문자열로 변환
      };

      try {
        const data: { list: Comment[] } = await getProductComments({
          productId,
          params,
        });
        setComments(data.list);
        setError(null);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("상품의 댓글을 불러오지 못했어요.");
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
