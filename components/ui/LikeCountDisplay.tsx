import React from "react";
import styled from "styled-components";
import HeartIcon from "@/public/images/icons/ic_heart.svg";
import { FlexRowCentered } from "@/styles/CommonStyles";
import Image from "next/image";

const LikeCountWrapper = styled(FlexRowCentered)<{
  $fontSize: number;
  $gap: number;
}>`
  color: var(--gray-500);
  font-size: ${({ $fontSize }) => `${$fontSize}px`};
  gap: ${({ $gap }) => `${$gap}px`};
`;

interface LikeCountDisplayProps {
  count: number;
  iconWidth?: number;
  fontSize?: number;
  gap?: number;
  className?: string;
}

const LikeCountDisplay: React.FC<LikeCountDisplayProps> = ({
  count,
  iconWidth = 16,
  fontSize = 16,
  gap = 4,
  className,
}) => {
  const displayCount = count >= 10000 ? "9999+" : count.toString();

  return (
    <LikeCountWrapper className={className} $fontSize={fontSize} $gap={gap}>
      <Image alt="하트 아이콘" src={HeartIcon} width={iconWidth} height={16} />
      {displayCount}
    </LikeCountWrapper>
  );
};

export default LikeCountDisplay;
