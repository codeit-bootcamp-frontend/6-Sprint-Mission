import Navigation from "./Navigation";
import "./style/App.css";
import BestProductsSection from "./BestProductsSection";
import { getProductsInfo } from "./api";
import { useState, useEffect } from "react";
import AllProductsSection from "./AllProductsSection";

function App() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [order, setOrder] = useState("좋아요순");

  const handleLoad = async () => {
    const { list } = await getProductsInfo();
    setProducts(list);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  // order 상태 또는 products 상태가 변경될 때마다 상품 목록을 정렬합니다.
  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      if (order === "최신순") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        // "좋아요순"
        return b.favoriteCount - a.favoriteCount;
      }
    });
    setSortedProducts(sorted);
  }, [order, products]);

  return (
    <>
      <Navigation />
      <BestProductsSection products={products.slice(0, 4)} />
      <AllProductsSection
        products={sortedProducts}
        setOrder={setOrder}
        order={order}
      />
    </>
  );
}

export default App;
