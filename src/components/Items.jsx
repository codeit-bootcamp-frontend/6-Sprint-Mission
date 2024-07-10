import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';

function Items() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetchProducts();
        console.log('상품받아오기', data);
        setProducts(data);
      } catch (error) {
        console.error('상품받아오기실패', error);
      }
    }
    getProducts();
  }, []);

  return (
    <div>
      <h1>임시 상품 리스트 페이지</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
