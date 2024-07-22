import styled from 'styled-components';
import { LineDivider } from '../../../styles/CommonStyles';
import TagDisplay from './TagDisplay';
import LikeButton from './LikeButton';
import { ReactComponent as SeeMoreIcon } from '../../../assets/images/icons/ic_kebab.svg';
import { Product } from '../../../types/ProductTypes';

const SectionContainer = styled.section`
  /* 모바일에선 이미지와 상세내용 섹션이 위아래로 배치되어 있다가, 타블렛부터는 같은 줄로 flex */
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
    border-radius: 12px; // 방법 1: 이미지에 직접 border-radius 적용 OR 방법 2: 이미지 wrapper div에 border-radius 적용하는 경우엔 overflow: hidden 필요
    width: 100%;
    height: auto; // 이미지 사이즈 변경 시 비율 유지
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
  /* 만약 LikeButton이 가로로 스트레칭되는 이슈가 있었다면?
    - Flexbox에서 부모 요소에 flex-direction: column;이 설정되어 있고, align-items가 명시적으로 지정되지 않았다면 기본값인 stretch가 적용되어 자식 요소들이 교차축(가로축)을 따라 스트레칭돼요.
    - 자식 요소에 width가 지정되지 않았다면 자식 요소는 교차축에 맞춰 부모 컨테이너의 전체 너비를 채우려고 하기 때문에 자식 요소에 width 또는 max-width를 명시해주는 방법으로 해결 가능해요. 하지만 우리는 반응형 디자인을 추구하기 때문에 요소의 width를 지정해주는 것 보다는 max-width만 정해주거나 부모 요소에 align-items: flex-start;를 추가하는 방법을 추천해요.
  */
  align-items: flex-start;
`;

const MainDetails = styled.div`
  width: 100%;
  position: relative;
`;

// 더보기 버튼을 MainDetails 우측 상단에 포지셔닝
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

function ItemProfileSection({ product }: ItemProfileSectionProps) {
  return (
    <SectionContainer>
      <ItemImage>
        <img src={product.images[0]} alt={`${product.name} 상품 대표 사진`} />
      </ItemImage>

      <ItemDetailsContainer>
        <MainDetails>
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

        <LikeButton productId={product.id} isFavorite={product.isFavorite} favoriteCount={product.favoriteCount} />
      </ItemDetailsContainer>
    </SectionContainer>
  );
}

export default ItemProfileSection;
