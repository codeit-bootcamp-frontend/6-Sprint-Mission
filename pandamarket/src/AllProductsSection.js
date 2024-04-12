import Button from "./Button";
import ProductInfoCard from "./ProductInfoCard";
import "./style/AllProducts.css";
import DropDown from "./DropDown";
function AllProductsSection({ products, setOrder }) {
  const IMG_WIDTH = "220px";
  const IMG_HEIGHT = "220px";

  return (
    <div className="allProductsSection">
      <div className="productsToolbar">
        <h1>전체 상품</h1>
        <div className="tool-container">
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            name="search"
          ></input>
          <Button>상품등록하기</Button>
          <DropDown setOrder={setOrder} />
        </div>
      </div>
      <div className="allProducts">
        {products.map((product) => (
          <ProductInfoCard
            key={product.id}
            product={product}
            imgWidth={IMG_WIDTH}
            imgHeight={IMG_HEIGHT}
          />
        ))}
      </div>
    </div>
  );
}

export default AllProductsSection;
