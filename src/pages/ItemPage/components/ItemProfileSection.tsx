import styled from "styled-components";
import { LineDivider } from "../../../styles/CommonStyles";
import TagDisplay from "./TagDisplay";
import LikeButton from "./LikeButton";
import { ReactComponent as SeeMoreIcon } from "../../../assets/images/icons/ic_kebab.svg";
import { Product } from "../../../types/productTypes";

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-direction: row;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    gap: 24px;
  }
`;

const ItemImage = styled.div`
  width: 100%;
  height: 100%;

  img {
    border-radius: 12px;
    width: 100%;
    height: auto;
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    width: 40%;
    max-width: 486px;
  }
`;

const ItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  align-items: flex-start;
`;

const MainDetails = styled.div`
  width: 100%;
  position: relative;
`;

const SeeMoreButton = styled.button`
  position: absolute;
  right: 0;
`;

const ItemTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 20px;
    margin-bottom: 12px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

const ItemPrice = styled.h2`
  font-size: 24px;
  font-weight: 600;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: 32px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    font-size: 40px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 140%;
`;

const SectionLabel = styled.h3`
  color: var(--gray-600);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const TagDisplaySection = styled.div`
  margin: 24px 0;
`;

interface ItemProfileSectionProps {
  product: Product;
}

const ItemProfileSection: React.FC<ItemProfileSectionProps> = ({ product }) => {
  return (
    <SectionContainer>
      {/* 참고: 호출된 상품 데이터의 images는 여러 개의 이미지 URL 문자열로 구성된 배열의 형태이지만, 디자인 요구사항에 슬라이더 등 여러 장의 사진을 보여주는 UI가 없기 때문에 가장 첫 번째 이미지만 선택해서 보여줄게요 */}
      <ItemImage>
        <img src={product.images[0]} alt={`${product.name} 상품 대표 사진`} />
      </ItemImage>

      <ItemDetailsContainer>
        <MainDetails>
          {/* 참고: 더보기 버튼 기능은 추후 요구사항에 따라 추가 예정 */}
          <SeeMoreButton>
            <SeeMoreIcon />
          </SeeMoreButton>

          <div>
            <ItemTitle>{product.name}</ItemTitle>
            <ItemPrice>{product.price.toLocaleString()}원</ItemPrice>
          </div>

          <LineDivider />

          <div>
            <SectionLabel>상품 소개</SectionLabel>
            <Description>{product.description}</Description>
          </div>

          <TagDisplaySection>
            <SectionLabel>상품 태그</SectionLabel>
            <TagDisplay tags={product.tags} />
          </TagDisplaySection>
        </MainDetails>

        <LikeButton
          productId={product.id}
          isFavorite={product.isFavorite}
          favoriteCount={product.favoriteCount}
        />
      </ItemDetailsContainer>
    </SectionContainer>
  );
};

export default ItemProfileSection;
