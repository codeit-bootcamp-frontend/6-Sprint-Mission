import "./favoriteitem.css";
import { useState, useEffect } from "react";
import { fetchProducts } from "../../../apis/api.tsx";
import heart from "../../../assets/item/ic_heart.svg";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  favoriteCount: number;
  images: string[];
}

export default function FavoriteItem() {
  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const { list } = await fetchProducts();
        if (Array.isArray(list)) {
          const sortedProducts = list.sort(
            (a: Product, b: Product) => b.favoriteCount - a.favoriteCount
          );
          const topFourProducts = sortedProducts.slice(0, 4);
          setBestProducts(topFourProducts);
        } else {
          throw new Error("Invalid data format: products list is not an array");
        }
      } catch (error: any) {
        console.error("Error fetching best products:", error);
        setError(error.message);
      }
    };

    fetchBestProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bestitems-container">
      <h2 className="bestitems-writer">베스트 상품</h2>
      <div className="bestitem">
        {bestProducts.map((product: Product) => (
          <div key={product.id} className="bestitem-container">
            <div>
              {product.images.map((image, index) => (
                <img
                  className="bestitem-image"
                  key={index}
                  src={image}
                  alt="상품 이미지"
                />
              ))}
            </div>
            <div className="bestitem-detail">
              <h3 className="bestitem-detail-name">{product.name}</h3>
              <p className="bestitem-detail-price">{product.price}원</p>
              <p className="bestitem-detail-favorite">
                <img src={heart} alt="하트 아이콘" />
                <span>{product.favoriteCount}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
