import { useState, useEffect } from "react";
import "./BestProducts.css";
import Card from "./Card";
import { getBestProducts } from "../api";

function BestProducts() {
  const [items, setItems] = useState([]);

  const handleBestLoad = async (options) => {
    try {
      const { list } = await getBestProducts(options);
      setItems(list);
    } catch (error) {
      console.error(`Error: handleBestLoad from BestProducts.jsx`, error);
    }
  };

  useEffect(() => {
    handleBestLoad({ page: 1, pageSize: 4, orderBy: "favorite" });
  }, []);

  const cardDescription = items.map((item) => item.description.split(" "));

  let cardTitles = [];

  cardDescription.forEach((itemDesc) => {
    const findIndex = itemDesc.findIndex(
      (str) => str === "팔아요" || str === "팝니다"
    );
    const title = itemDesc.slice(0, findIndex + 1).join(" ");
    cardTitles.push(title);
  });

  return (
    <div className='best-products'>
      <h1>베스트 상품</h1>
      <ul className='best-products-wrap'>
        {items.map((item, i) => (
          <Card key={item.id} {...item} cardTitle={cardTitles[i]} />
        ))}
      </ul>
    </div>
  );
}
export default BestProducts;
