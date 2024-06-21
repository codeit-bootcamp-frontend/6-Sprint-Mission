import styled from "styled-components";

// SVG 이미지 형식을 이용하는 큰 장점 중 하나는 비슷한 아이콘을 색상별로 저장할 필요 없이 하나의 파일로 유연하게 변경할 수 있다는 거예요.
// SVG 파일 내에 정의된 크기 또는 선 및 배경색을 동적으로 변경할 수 있는 컴포넌트를 만들어 볼게요.

interface IconWrapperProps {
  $size?: number;
  $fillColor?: string;
  $outlineColor?: string;
}

const IconWrapper = styled.div<IconWrapperProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${({ $fillColor }) => $fillColor || "current"}; // 색 채움
    width: ${({ $size }) => ($size ? `${$size}px` : "auto")};
    height: ${({ $size }) => ($size ? `${$size}px` : "auto")};
  }

  /* 선(stroke)의 색상 변경은 svg 내의 path 요소에 넣어줘야 적용돼요 */
  /* - 채움색이 있을 때는 아웃라인 색상도 함께 바꿔주는 것이 일반적이기 때문에 선에 대한 속성이지만 fillColor를 outlineColor보다 우선적으로 적용하도록 했어요 */
  svg path {
    stroke: ${({ $fillColor, $outlineColor }) =>
      $fillColor || $outlineColor || "currentColor"};
  }
`;

interface IconProps {
  iconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size?: number;
  fillColor?: string;
  outlineColor?: string;
}

const Icon: React.FC<IconProps> = ({
  // props 객체에서 `iconComponent` 속성을 추출해 `IconComponent`라는 별칭(alias)로 사용할 수 있게 함
  // - 통일성을 위해 prop 이름에는 camelCase를 사용했지만, SVG를 ReactComponent 형태로 전달하고 있기 때문에 PascalCase으로 바꿔 사용
  iconComponent: IconComponent,
  size, // Optional props이며, prop이 생략될 경우 SVG 파일의 기본 크기를 사용함
  fillColor = "currentColor",
  outlineColor = "currentColor",
}) => (
  <IconWrapper $size={size} $fillColor={fillColor} $outlineColor={outlineColor}>
    <IconComponent />
  </IconWrapper>
);

export default Icon;
