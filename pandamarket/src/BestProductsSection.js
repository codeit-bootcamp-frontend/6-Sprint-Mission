import ProductInfoCard from "./ProductInfoCard";
import "./style/BestProducts.css";
function BestProductsSection({ products }) {
  const IMG_WIDTH = "280px";
  const IMG_HEIGHT = "280px";
  const orderProducts = [...products].sort(
    (a, b) => b.favoriteCount - a.favoriteCount
  );
  return (
    <div className="bestProductsSection">
      <h1>베스트 상품</h1>
      <div className="bestProducts">
        {orderProducts.slice(0, 4).map((product) => (
          <ProductInfoCard
            key={product.id}
            product={product}
            imgHeigh={IMG_HEIGHT}
            imgWidth={IMG_WIDTH}
          />
        ))}
      </div>
    </div>
  );
}

export default BestProductsSection;
