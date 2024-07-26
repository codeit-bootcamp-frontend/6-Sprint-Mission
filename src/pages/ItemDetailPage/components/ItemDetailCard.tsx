import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../api/itemApi";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";
import { ItemType } from "../../../types/Items";

function ItemDetailCard() {
  const { itemId } = useParams();
  const [data, setData] = useState<ItemType>();

  const fetch = async () => {
    try {
      const res = await getProductById(itemId);
      setData(res);
    } catch (error) {
      console.error("상품 목록을 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    if (!itemId) return;
    fetch();
  }, [itemId]);

  // 데이터가 로드되지 않았을 경우 로딩 중 메시지 표시
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="detailImgContainer">
        <img className="detailImg" src={data.images[0]} alt={data.name} />
        <div className="detailInfoContainer">
          <div className="detailName">{data.name}</div>
          <div className="detailPrice">
            {Number(data.price).toLocaleString("ko-KR")}원
          </div>
          <div className="detailIntroduction">상품 소개</div>
          <p className="detailDescription">{data.description}</p>
          <div className="detailIntroduction">상품 태그</div>
          <div>
            <ul className="detailTag">
              {data.tags?.map((tag, index) => {
                return <li key={index}>#{tag}</li>;
              })}
            </ul>
            <div className="detailFavoriteCount">
              <HeartIcon />
              {data.favoriteCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailCard;
