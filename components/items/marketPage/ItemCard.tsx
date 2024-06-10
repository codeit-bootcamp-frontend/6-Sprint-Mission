import { Product } from "@/types/productTypes";
import styled from "styled-components";
import Link from "next/link";
import LikeCountDisplay from "@/components/ui/LikeCountDisplay";

const ItemCardContainer = styled(Link)`
  color: var(--gray-800);
  overflow: hidden;
  cursor: pointer;
`;

const ItemCardThumbnail = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  margin-bottom: 16px;
`;

const ItemSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

const ItemName = styled.h2`
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

interface ItemCardProps {
  item: Product;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <ItemCardContainer href={`/items/${item.id}`}>
      <ItemCardThumbnail
        src={item.images[0]}
        alt={`${item.name} 상품 썸네일`}
      />
      <ItemSummary>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
        <LikeCountDisplay count={item.favoriteCount} fontSize={12} />
      </ItemSummary>
    </ItemCardContainer>
  );
};

export default ItemCard;
