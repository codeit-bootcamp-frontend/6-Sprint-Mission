import Heart from "public/icon/ic_heart.svg";
import styled from "styled-components";

export const HeartContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HeartIcon = styled(Heart)`
  margin-right: 5px;
  cursor: pointer;
`;

export const HeartNumber = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  line-height: 1.9rem;
  color: ${({ theme }) => theme.colorPalette.fontSecondary};
`;