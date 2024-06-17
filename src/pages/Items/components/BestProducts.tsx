import React from "react";
import ItemCard from "./ItemCard";
import getProducts from "../../../api/getProducts";
import { useEffect, useState } from "react";
import "./BestProducts.css";
import useItemCount from "./useItemCount";
import { Product } from "../../../types";

const BestProducts: React.FC = () => {
  const maxVisibleItems: number = useItemCount();
  const [bestItems, setItems] = useState<Product["list"]>();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts({
        pageSize: maxVisibleItems,
        orderBy: "favorite",
      });
      setItems(data.list);
    };

    fetchProducts();
  }, [maxVisibleItems]);

  return (
    <div className="container-best-products">
      <h1>베스트 상품</h1>
      <div className="item-cards-container">
        {bestItems ? (
          bestItems.map(item => <ItemCard key={item.id} best item={item} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BestProducts;
