import ProductList from "./ProductList.js";
import { useState, useEffect, React } from "react";
import { getItems } from "../../api/Api.js";

function BestProducts() {
  const [items, setItems] = useState([]);

  const productsLoad = async (options) => {
    const { list } = await getItems(options);
    setItems(list); // <- ()?
  };

  useEffect(() => {
    productsLoad({ pageSize: 4, orderBy: "favorite" });
  }, []);

  return (
    <div className="best-items">
      <h2>베스트 상품</h2>
      <ProductList items={items} />
    </div>
  );
}

export default BestProducts;
