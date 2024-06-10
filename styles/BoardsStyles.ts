import styled from "styled-components";
import { SpaceBetween } from "@/styles/CommonStyles";

export const ArticleTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  flex: 1;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 20px;
  }
`;

export const MainContent = styled.div`
  display: flex;
  gap: 8px;
  min-height: 72px;
`;

export const ArticleInfo = styled(SpaceBetween)`
  margin-top: 16px;
`;

export const ArticleInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-600);
  font-size: 14px;
`;

export const Timestamp = styled.span`
  font-size: 14px;
  color: var(--gray-400);
`;

export const ArticleThumbnail = styled.div`
  background-color: #fff;
  border: 1px solid var(--gray-200);
  width: 72px;
  height: 72px;
  border-radius: 8px;
  padding: 12px;
`;

// fill을 사용해 Next 이미지 크기를 조정하면 이미지가 position된 가장 가까운 조상 요소를 기준으로 absolute positioning하기 때문에 thumbnail wrapper를 position: relative로 설정해 이미지가 해당 div를 채우도록 했어요
// fill 이미지는 absolute positioning을 통해 부모 요소를 꽉 채우기 때문에 부모 요소에 적용된 padding이 무시돼요. 그래서 inner wrapper로 이미지를 한 단계 더 감싸주었어요.
export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
