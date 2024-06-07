import { useEffect, useState } from "react";
import { getProductComments } from "@/api/itemApi";
import styled from "styled-components";
import EmptyStateImage from "@/assets/images/ui/empty-comments.svg";
import SeeMoreIcon from "@/assets/images/icons/ic_kebab.svg";
import DefaultProfileImage from "@/assets/images/ui/ic_profile.svg";
import { LineDivider } from "@/styles/CommonStyles";
import { formatUpdatedAt } from "@/utils/dateUtils";

const CommentContainer = styled.div`
  padding: 24px 0;
  position: relative;
`;

// 더보기 버튼을 댓글 아이템 우측 상단에 포지셔닝
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

// Mock data에서 보내주는 프로필 사진은 이미 원형이지만, 혹시 원이 아닌 이미지를 표시해야 하는 경우를 대비해 border-radius를 적용하고 이미지가 주어진 원 내에서 비율을 유지하면서 삽입되도록 함
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

const CommentItem = ({ item }) => {
  const authorInfo = item.writer;
  // 업데이트 시간 표기를 위한 util function을 만들었으니 dateUtils.js 파일에서 꼭 설명을 확인해 주세요!
  const formattedTimestamp = formatUpdatedAt(item.updatedAt);

  return (
    <>
      <CommentContainer>
        {/* 참고: 더보기 버튼 기능은 추후 요구사항에 따라 추가 예정 */}
        <SeeMoreButton>
          <SeeMoreIcon />
        </SeeMoreButton>

        <CommentContent>{item.content}</CommentContent>

        <AuthorProfile>
          <UserProfileImage
            src={authorInfo.image || DefaultProfileImage} // 등록된 프로필 사진이 없을 경우 기본 프로필 아이콘 사용
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

function CommentThread({ productId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
