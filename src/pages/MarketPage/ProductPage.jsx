import { getProducts } from "../../api/itemApi.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductPage.css";
import { ReactComponent as HeartIcon } from "../../assets/images/icons/ic_heart.svg";
import pict from "../pic.png";

function formatNumber(won) {
  return won.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const { productsId } = useParams();
  console.log(productsId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProducts({ id: productsId });
        setProduct(
          response.list.find((item) => item.id === parseInt(productsId))
        ); // id 동적
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [productsId]);

  return (
    <div class="desc-info">
      {product ? (
        <>
          <br id="brr"></br>
          <div className="desc-info-top">
            <div>
              <img
                className="product-page-image"
                src={product.images[0]}
                alt={product.name}
              />
            </div>
            <div className="desc-info-top-right">
              <p className="product-page-name">{product.name}</p>
              <p className="product-page-price">
                {formatNumber(product.price)}원
              </p>
              <hr className="hr1"></hr>
              <p className="product-page-sogae">상품소개</p>
              <p className="product-page-sogattext">{product.description}</p>
              <p className="product-page-tag">상품태그</p>
              <div className="product-page-taglist">
                {product.tags.map((tag, index) => (
                  <span key={index} className="product-tag">
                    #{tag}
                  </span>
                ))}
              </div>
              <button className="product-page-favoriteCount">
                <HeartIcon className="heartIcon" />
                {product.favoriteCount}
              </button>
            </div>
          </div>
          <hr className="hr2"></hr>
          <div className="inq">
            <p className="product-page-inquire">문의하기</p>
            <textarea
              className="textt"
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            ></textarea>
            <button className="regis-button">등록</button>

          </div>
          <p className="ment">혹시 사용기간이 어떻게 되실까요?</p>
          <image className="ava" src={pict} alt="avatar" />
          <div>
            <p className="nickname">상큼한판다</p>
            <p className="ago">1시간 전</p>
            <hr className="hr3"></hr>
          </div>
          <p className="ment">색상이 어떻게 되는지 궁금해요!</p>
          <image className="ava" src={pict} alt="avatar" />
          <div>
            <p className="nickname">똑똑한판다</p>
            <p className="ago">1시간 전</p>
            <hr className="hr3"></hr>
          </div>
          <p className="ment">상세 잔기스 사진 있을까요?</p>
          <image className="ava" src={pict} alt="avatar" />
          <div>
            <p className="nickname">강인한판다</p>
            <p className="ago">1시간 전</p>
            <hr className="hr3"></hr>
          </div>

<div className="return-bottom">
          <button className="return-button">목록으로 돌아가기</button>
          </div>
        </>
      ) : (
        <p>로딩즁~</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
