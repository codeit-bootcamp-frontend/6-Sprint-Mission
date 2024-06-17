import styles from "./AllProducts.module.css";
import Product from "../Product/Product";
import { useState } from "react";

interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  favoriteCount: number;
  updatedAt: string;
  isBestProduct?: boolean;
}

interface ProductsListProps {
  products: {
    list: ProductProps[];
  };
}

function getAllProducts(productsList: ProductProps[], n: number, sortBy: string): ProductProps[] {
  let sortedProducts = [...productsList];

  if (sortBy === "latest") {
    sortedProducts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } else if (sortBy === "favorites") {
    sortedProducts.sort((a, b) => b.favoriteCount - a.favoriteCount);
  }

  return sortedProducts.slice(0, n);
}

const AllProducts: React.FC<ProductsListProps> = ({ products }) => {
  const [sortBy, setSortBy] = useState<string>("latest");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const allProducts = getAllProducts(products.list, 10, sortBy);

  return (
    <div className={styles.allProducts}>
      <div className={styles.allProductsHeader}>
        <h1>전체 상품</h1>
        <div className={styles.productsControl}>
          <input
            className={styles.search}
            type="text"
            placeholder="검색할 상품을 입력하세요"
          />
          <button className={styles.addProductButton}>상품 등록하기</button>
          <div className={styles.dropdown}>
            <select id="sort-by" onChange={handleSortChange}>
              <option value="latest">최신순</option>
              <option value="favorites">좋아요순</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.allProductsList}>
        {allProducts.map(product => (
          <Product 
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            tags={product.tags}
            images={product.images}
            ownerId={product.ownerId}
            favoriteCount={product.favoriteCount}
            updatedAt={product.updatedAt}
            isBestProduct={false}
          />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
