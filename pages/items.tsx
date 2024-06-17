import AllProducts from "@/components/itemsPage/AllProducts.tsx/AllProducts";
import { useEffect, useState } from "react";

export default function Items() {
  const [products, setProducts] = useState({ list: [], totalCount: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://panda-market-api.vercel.app/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="items-page">
      {/* <BestProducts products={products} /> */}
      <AllProducts products={products}  />
    </div>
  );
}