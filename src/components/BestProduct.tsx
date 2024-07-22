import React from 'react';
import { productType } from '../api/type';
import heart from '../img/smallHeart.png';

interface bestProductProps {
  product: productType;
  onClick: (id: number) => void;
}

const BestProduct = ({ product, onClick }: bestProductProps) => {
  return (
    <div className='bestProduct' onClick={() => onClick(product.id)}>
      <img className='image' src={product.images[0]} alt='상품이미지' />
      <p className='description'>{product.description}</p>
      <p className='price'>{product.price}원</p>
      <p className='favoriteCount'>
        <img className='favorites' src={heart} /> {product.favoriteCount}
      </p>
    </div>
  );
};

export default BestProduct;

