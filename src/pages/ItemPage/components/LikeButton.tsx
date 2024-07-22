import styled from 'styled-components';
import { ReactComponent as HeartSvg } from '../../../assets/images/icons/ic_heart.svg';
import { FlexContainer } from '../../../styles/CommonStyles';
import Icon from '../../../components/UI/Icon';
import { LikeButtonProps } from '../../../types/ItemTypes';

// 참고: 추후 요구사항에 따라 기능 추가 예정

const PillButton = styled.button`
  color: var(--gray-500);
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--gray-200);

  /* 버튼 hover 시 아이콘의 아웃라인과 채움색을 변경 */
  &:hover svg path {
    fill: var(--red);
    stroke: var(--red);
  }
`;

const ButtonContent = styled(FlexContainer)`
  gap: 4px;
`;

function LikeButton({ productId, isFavorite, favoriteCount }: LikeButtonProps) {
  return (
    <PillButton>
      <ButtonContent>
        <Icon iconComponent={HeartSvg} size={24} fillColor={isFavorite ? 'var(--red)' : undefined} />
        {favoriteCount.toLocaleString()}
      </ButtonContent>
    </PillButton>
  );
}

export default LikeButton;
