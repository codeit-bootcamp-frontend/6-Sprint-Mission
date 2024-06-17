import styles from "./Product.module.css";

// Props 타입 정의
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
  isBestProduct?: boolean; // Optional property
}

function Product({
  id,
  name,
  description,
  price,
  tags,
  images,
  ownerId,
  favoriteCount,
  updatedAt,
  isBestProduct,
}: ProductProps) {
  // const favoriteIconSrc = process.env.PUBLIC_URL + "/images/favorite-icon.png";

  const cardStyle = isBestProduct ? "product-card-best" : "product-card-all";

  return (
    <div className={styles[cardStyle]}>
      {/* <p>업데이트:{updatedAt}</p> */}
      {/* <img src={images[0]} alt={name} className={styles['product-image']} /> */}
      <div className={styles['product-card-description']}>
        <p className={styles['product-name']}>{name}</p>
        <p className={styles['product-price']}>{price}원</p>
        <div className={styles['favorite-count']}>
          {/* <img src={favoriteIconSrc} className={styles['favorite-icon']} /> */}
          <p className={styles['favorite-count-number']}>{favoriteCount}</p>
        </div>
      </div>
    </div>
  );
  
}

export default Product;