import { useEffect, useState } from "react";
import { getArticleComments } from "@/api/itemApi";
import styled from "styled-components";
import SeeMoreIcon from "@/public/images/icons/ic_kebab.svg";
import DefaultProfileImage from "@/public/images/ui/ic_profile.svg";
import { LineDivider } from "@/styles/CommonStyles";
import { formatUpdatedAt } from "@/utils/dateUtils";
import {
  ProductComment,
  ProductCommentListResponse,
} from "@/types/commentTypes";
import EmptyState from "@/components/ui/EmptyState";

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

interface CommentItemProps {
  item: ProductComment;
}

const CommentItem: React.FC<CommentItemProps> = ({ item }) => {
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

      <LineDivider $margin="0" />
    </>
  );
};

const ThreadContainer = styled.div`
  margin-bottom: 40px;
`;

interface CommentThreadProps {
  articleId: number;
}

const BoardCommentThread: React.FC<CommentThreadProps> = ({ articleId }) => {
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleId) return;

    const fetchComments = async () => {
      setIsLoading(true);

      try {
        const response: ProductCommentListResponse = await getArticleComments({
          articleId,
        });
        setComments(response.list);
        setError(null);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("댓글을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [articleId]);

  if (isLoading) {
    return <div>댓글 로딩중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (comments && !comments.length) {
    return <EmptyState text="아직 댓글이 없어요. 지금 댓글을 달아보세요!" />;
  } else {
    return (
      <ThreadContainer>
        {comments.map((item) => (
          <CommentItem item={item} key={`comment-${item.id}`} />
        ))}
      </ThreadContainer>
    );
  }
};

export default BoardCommentThread;
