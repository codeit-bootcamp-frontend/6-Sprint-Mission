import React from 'react';
import moreImg from '../img/moreBtn.png';
import mediumHeart from '../img/mediumHeart.png';
import { productType } from '../api/type';
import style from '../style/ProductIntroduce.module.css';

const ProductDetail = ({ product }: { product: productType }) => {
  return (
    <div className={style['productContainer']}>
      <img
        className={style['itemImage']}
        src={product.images[0]}
        alt='물품상세이미지'
      />
      <div className={style['informationContainer']}>
        <div className={style['info']}>
          <div>
            <p className={style['titleInfo']}>{product.name}</p>
            <p className={style['priceInfo']}>{product.price}원</p>
          </div>
          <button className={style['moreBtn']}>
            <img src={moreImg} alt='더보기버튼' />
          </button>
        </div>

        <div className={style['introduceContainer']}>
          <p className={style['introduce']}>상품 소개</p>
          {product?.description}
        </div>

        <div className={style['tagContainer']}>
          <p className={style['tagInfo']}>상품태그</p>
        </div>

        <div className={style['likeContainer']}>
          <button className={style['likeBtn']}>
            <img className={style['likeImg']} src={mediumHeart} />
          </button>
          {product.favoriteCount}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;

