import styled from "styled-components";
import { ReactComponent as HeartSvg } from "../../../assets/images/icons/ic_heart.svg";
import { FlexContainer } from "../../../styles/CommonStyles";
import Icon from "../../../components/UI/Icon";

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

interface LikeButtonProps {
  productId: number;
  isFavorite: boolean;
  favoriteCount: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  productId,
  isFavorite,
  favoriteCount,
}) => {
  return (
    <PillButton>
      <ButtonContent>
        {/* SVG의 사이즈 및 색상을 동적으로 변경할 수 있는 컴포넌트를 만들었어요 */}
        <Icon
          iconComponent={HeartSvg}
          size={24}
          // 조건부 연산자 `&&`을 사용했던 기존 코드의 경우엔 isFavorite이 false일 때 fillColor의 값으로 boolean인 false가 반환됩니다.
          // 타입스크립트 전환 후 fillColor의 타입을 string으로 설정해주었기 때문에 fillColor는 string | boolean 일 수 없다는 타입스크립트 오류가 나요.
          // 이렇게 조건에 따라 optional prop을 이용하고 싶지 않은 경우엔 undefined를 전달하면 해당 컴포넌트에서 기본값을 적용합니다.
          fillColor={isFavorite ? "var(--red)" : undefined}
        />
        {favoriteCount.toLocaleString()}
      </ButtonContent>
    </PillButton>
  );
};

export default LikeButton;
