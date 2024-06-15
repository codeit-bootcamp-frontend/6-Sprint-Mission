import { Product } from '@/types/productTypes';
import Image from 'next/image';
import Tag from './Tag';
import HeartIcon from '@/public/images/icons/ic_heart.svg';

interface ItemInforSectionProps {
  product: Product;
}

const ItemInfoSection: React.FC<ItemInforSectionProps> = ({ product }) => {
  return (
    <div className="flex gap-6">
      <Image
        width={486}
        height={486}
        src={product.images[0]}
        alt={`${product.name} 상품 대표 사진`}
        className="object-cover"
      />
      <div className="h-[486px] flex flex-col">
        <div className="flex flex-col">
          <h1>{product.name} 팔아요</h1>
          <h2>{product.price.toLocaleString()}원</h2>
        </div>
        <hr />
        <div className="flex flex-col gap-6">
          <h3>상품 소개</h3>
          <p>{product.description}</p>
        </div>

        <div className="flex flex-col">
          <h3>상품 태그</h3>
          <Tag tags={product.tags} />
        </div>
        <div>
          <button className="flex">
            <HeartIcon width={26.8} height={23.3} />
            {product.favoriteCount.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemInfoSection;
