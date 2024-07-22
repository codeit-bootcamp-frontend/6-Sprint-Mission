import React from 'react';
import ProductDetail from './ProductDetail';
import InquiryFormContainer from './InquiryFormContainer';
import CommentsContainer from './CommentsContainer';
import { inquiryType, productType } from '../api/type';
import style from '../style/item.module.css';

const SpecificItem = ({
  specificItem,
  inquiries,
}: {
  specificItem: productType;
  inquiries: inquiryType[];
}) => {
  return (
    <div className={style['itemContainer']}>
      <ProductDetail product={specificItem} />
      <InquiryFormContainer />
      <CommentsContainer inquiries={inquiries} />
    </div>
  );
};

export default SpecificItem;

