import Kebab from "public/icon/ic_kebab.svg";
import styled from "styled-components";

export const DetailArticleLayout = styled.section`
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 600;
  line-height: 2.1rem;
  margin-bottom: 24px;
`;

export const KebabIcon = styled(Kebab)`
  cursor: pointer;
`;

export const Footer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 24px;
  background: ${({ theme }) => theme.colorPalette.tertiary}
`;

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  line-height: 1.6rem;
  margin-top: 16px;
`;