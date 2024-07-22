import React from 'react';
import { productType } from '../api/type';
import BestProduct from './BestProduct';

interface bestProductsProps {
  products: productType[];
  onClick: (id: number) => void;
}

const BestProducts = ({ products, onClick }: bestProductsProps) => {
  return (
    <div className='bestContainer'>
      <p id='title'>베스트 상품</p>
      <div className='bestList'>
        {products.map((element) => {
          return (
            <BestProduct key={element.id} product={element} onClick={onClick} />
          );
        })}
      </div>
    </div>
  );
};

export default BestProducts;

