import { useQuery } from "@tanstack/react-query";
import { getProductComments } from "../../../api/itemApi";
import styled from "styled-components";
import { ReactComponent as EmptyStateImage } from "../../../assets/images/ui/empty-comments.svg";
import { ReactComponent as SeeMoreIcon } from "../../../assets/images/icons/ic_kebab.svg";
import DefaultProfileImage from "../../../assets/images/ui/ic_profile.svg";
import { formatUpdatedAt } from "../../../utils/dateUtils";
import { useState } from "react";

const CommentContainer = styled.div`
  padding: 24px 0;
  position: relative;
`;

const SeeMoreButton = styled.button`
  position: absolute;
  right: 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 24px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const DropdownItem = styled.button`
  padding: 8px 16px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <CommentContainer>
        <SeeMoreButton onClick={toggleDropdown}>
          <SeeMoreIcon />
        </SeeMoreButton>

        {isDropdownOpen && (
          <DropdownMenu>
            <DropdownItem onClick={() => alert("Edit")}>수정하기</DropdownItem>
            <DropdownItem onClick={() => alert("Delete")}>
              삭제하기
            </DropdownItem>
          </DropdownMenu>
        )}

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
  const { data, isLoading, error } = useQuery<{ list: Comment[] }, Error>({
    queryKey: ["comments", productId],
    queryFn: () => getProductComments({ productId, params: { limit: "10" } }),
  });

  if (isLoading) {
    return <div>상품 댓글 로딩중...</div>;
  }

  if (error) {
    return <div>오류: {error.message}</div>;
  }

  if (data?.list && !data.list.length) {
    return <EmptyState />;
  } else {
    return (
      <ThreadContainer>
        {data?.list.map((item) => (
          <CommentItem item={item} key={`comment-${item.id}`} />
        ))}
      </ThreadContainer>
    );
  }
}

export default CommentThread;
