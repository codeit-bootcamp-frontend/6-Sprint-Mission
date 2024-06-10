import Image from "next/image";
import styled from "styled-components";

export const ProfileImage = styled(Image)`
  margin-right: 8px;
`;

export const NickName = styled.span`
  margin-right: 8px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  line-height: 1.7rem;
  color: ${({ theme }) => theme.colorPalette.fontSecondary};
`;

export const CreatedDate = styled.span`
  margin-right: auto;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  line-height: 1.7rem;
  color: ${({ theme }) => theme.colorPalette.fontSecondary};
`;