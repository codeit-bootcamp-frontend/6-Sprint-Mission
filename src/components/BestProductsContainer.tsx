import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import BestProducts from './BestProducts';
import { getProducts } from '../api/api';
import '../style/BestProduct.css';
import { deviceSize } from '../util/deviceSize';

const BestProductsContainer = ({ windowWidth }: { windowWidth: number }) => {
  const query = `?orderBy=favorite`;
  const { data, isPending } = useQuery({
    queryKey: ['bestProudcts'],
    queryFn: () => getProducts(query),
  });

  const navigate = useNavigate();

  const handleNavigateItemDetail = (id: number) => {
    navigate(`/items/${id}`);
  };

  if (!isPending && data) {
    let products = [];
    const fourProducts = [...data.slice(0, 4)];
    const twoBestProducts = [...data.slice(0, 2)];
    const oneBestProduct = [...data.slice(0, 1)];

    if (windowWidth < deviceSize.mobile) {
      products = oneBestProduct;
    } else if (
      windowWidth < deviceSize.tablet &&
      windowWidth > deviceSize.mobile
    ) {
      products = twoBestProducts;
    } else {
      products = fourProducts;
    }

    return (
      <BestProducts products={products} onClick={handleNavigateItemDetail} />
    );
  }
};

export default BestProductsContainer;

