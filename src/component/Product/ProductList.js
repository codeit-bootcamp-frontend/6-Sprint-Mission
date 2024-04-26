import { Link } from "react-router-dom";
import heartIcon from "../../images/Icon.png";

function ProdictListItem({ item }) {
  const price = item.price.toLocaleString("ko-KR");

  return (
    <Link to={`/product/${item.id}`}>
      <div className="product-item">
        <div className="product-img-area">
          <img className="product-img" src={item.images} alt={item.name} />
        </div>
        <p className="product-title">{item.name}</p>
        <p className="product-price">{price}원</p>
        <p className="product-like">
          <img src={heartIcon} alt="좋아요 이미지" /> {item.favoriteCount}
        </p>
      </div>
    </Link>
  );
}

function ProductList({ items }) {
  return (
    <ul className="product-list">
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ProdictListItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default ProductList;
