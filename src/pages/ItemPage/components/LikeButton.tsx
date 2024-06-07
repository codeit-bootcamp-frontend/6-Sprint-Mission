import styled from "styled-components";
import HeartSvg from "@/assets/images/icons/ic_heart.svg";
import { FlexContainer } from "@/styles/CommonStyles";
import Icon from "@/components/UI/Icon";

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
type LikeButtonProps = {
  productId?: number;
  isFavorite: boolean;
  favoriteCount: number;
}
function LikeButton({
  productId,
  isFavorite,
  favoriteCount
}: LikeButtonProps) {
  return (
    <PillButton>
      <ButtonContent>
        {/* SVG의 사이즈 및 색상을 동적으로 변경할 수 있는 컴포넌트를 만들었어요 */}
        <Icon
          iconComponent={HeartSvg}
          size={24}
          fillColor={isFavorite ? "var(--red)" : null}
        />
        {favoriteCount.toLocaleString()}
      </ButtonContent>
    </PillButton>
  );
}

export default LikeButton;
