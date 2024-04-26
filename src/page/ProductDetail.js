import { Link, useParams } from "react-router-dom";
import { getItemDetail, getItemDetailComment } from "../api/Api";
import { useEffect, useState } from "react";
import favoriteCount from "./../images/favoriteCount.png";
import backPage from "./../images/backPage.png";
import ProductDetailComment from "./../component/Product/ProductDetailComment";

function ProductDetail() {
  const [view, setView] = useState(null);
  const [comment, setComment] = useState(null);
  const { id } = useParams();

  const DetailLoad = async (id) => {
    const item = await getItemDetail({ id });
    const { list } = await getItemDetailComment({ id });
    setComment(list);
    setView(item);
  };
  useEffect(() => {
    DetailLoad(id);
  }, [id]);

  if (!view) {
    return null;
  }

  if (!comment) {
    return null;
  }

  return (
    <div className="container">
      <div className="product-detail">
        <img src={view.images} alt="상품 이미지" className="detail-img" />
        <div className="detail-desc">
          <h2>{view.name}</h2>
          <h3>{view.price.toLocaleString("ko-KR")}원</h3>
          <p>
            <span>상품소개</span>
            {view.description}
          </p>
          <span>상품 태그</span>
          <ul>
            {view.tags.map((tag, index) => (
              <li key={index}>#{tag}</li>
            ))}
          </ul>
          <div className="detail-favorite">
            <img src={favoriteCount} alt="좋아요 하트" />
            {view.favoriteCount}
          </div>
        </div>
      </div>
      <ProductDetailComment comments={comment} />
      <div className="detail-button">
        <Link to="/Product">
          <span>목록으로 돌아가기</span>
          <img src={backPage} alt="목록으로 돌아가기" />
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
