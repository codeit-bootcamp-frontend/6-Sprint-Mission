import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProductDetail } from "../api";
import ItemQuestion from "../components/ItemsIdPage/ItemQuestion";
import ItemDescription from "../components/ItemsIdPage/ItemDescription";
import BackIcon from "../assets/img/BackIcon.svg";
import "../components/ItemsIdPage/ItemsIdPage.css";

function ItemsIdPage() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductDetail(id);
        setProduct(data);
        if (!data) {
          throw new Error("해당 상품의 데이터를 찾을 수 없습니다.");
        }
      } catch (error) {
        setError(error.message);
      }
    }
    fetchProduct();
  }, [id]);

  if (!id || !product) return null;

  return (
    <div className="IdPageContainer">
      <ItemDescription product={product} />
      <hr className="hrStyle" />
      <ItemQuestion id={id} />
      <button
        className="BackButton"
        onClick={() => {
          nav("/items");
        }}
      >
        목록으로 돌아가기
        <img src={BackIcon} />
      </button>
    </div>
  );
}

export default ItemsIdPage;
