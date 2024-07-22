import styled from 'styled-components';
import { ReactComponent as SeeMoreIcon } from '../../../assets/images/icons/ic_kebab.svg';
import DefaultProfileImage from '../../../assets/images/ui/ic_profile.svg';
import { LineDivider } from '../../../styles/CommonStyles';
import { formatUpdatedAt } from '../../../utils/dateUtils';
import { CommentItemProps } from '../../../types/CommentTypes';

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

const CommentItem = ({ item }: CommentItemProps) => {
  const authorInfo = item.writer;
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

export default CommentItem;
