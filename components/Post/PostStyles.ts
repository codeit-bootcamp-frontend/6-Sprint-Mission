import styled from "styled-components";

export const PostList = styled.ul`
`;

export const PostItem = styled.li`
  margin-bottom: 24px;
`;

export const PostLayout = styled.div`
  width: 100%;
  height: 136px;
  padding-bottom: 24px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 600;
  line-height: 2.1rem;
`;

export const ImageContainer = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colorPalette.tertiary};
  padding: 12px;
  background-color: ${({ theme }) => theme.colorPalette.background};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
