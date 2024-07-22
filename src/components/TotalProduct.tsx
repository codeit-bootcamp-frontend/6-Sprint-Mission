import React from 'react';
import { productType } from '../api/type';
import heart from '../img/smallHeart.png';
interface totalProductProps {
  element: productType;
  onClick: (id: number) => void;
}

const TotalProduct = ({ element, onClick }: totalProductProps) => {
  return (
    <div
      className='gridComponent'
      key={element.id}
      onClick={() => onClick(element.id)}
    >
      <img className='productImage' src={element.images[0]} />
      <p className='name'>{element.name}</p>
      <p className='price'>{element.price}원</p>
      <p className='favoriteCount'>
        {' '}
        <img className='favorites' src={heart} /> {element.favoriteCount}
      </p>
    </div>
  );
};

export default TotalProduct;

