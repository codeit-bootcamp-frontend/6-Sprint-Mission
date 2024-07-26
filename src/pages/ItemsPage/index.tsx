import React from 'react';
import TopNavigation from 'components/TopNavigation';
import BestProductList from './components/BestProductList';
import AllProductList from './components/AllProductList';
import './style.module.css';

const ItemsPage = () => {
  return (
    <>
      <TopNavigation />
      <main>
        <BestProductList />
        <AllProductList />
      </main>
    </>
  );
};

export default ItemsPage;
