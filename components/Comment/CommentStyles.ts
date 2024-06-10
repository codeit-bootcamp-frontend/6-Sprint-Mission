import styled from "styled-components";
import Kebab from "public/icon/ic_kebab.svg";

export const CommentsContainer = styled.div`
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

// Comment Header
export const CommentHeader = styled.div`
display: flex;
justify-content: space-between;

`
export const CommentContent = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  line-height: 1.7rem;
`;

export const KebabIcon = styled(Kebab)`
  cursor: pointer;
`;

// Comment Footer
export const CommentFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UserName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  line-height: 1.4rem;
  color: ${({ theme}) => theme.colorPalette.fontSecondary};
`;

export const CommentTime = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4rem;
  color: ${({ theme}) => theme.colorPalette.inputPlaceholderColor};
`;