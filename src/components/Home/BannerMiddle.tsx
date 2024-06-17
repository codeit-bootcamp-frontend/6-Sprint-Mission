import React from 'react';
import img1 from "../../assets/img/img_home_01.svg";
import img2 from "../../assets/img/img_home_02.svg";
import img3 from "../../assets/img/img_home_03.svg";

const BannerMiddle: React.FC = () => {
  return (
    <section className="banner-middle">
      <div className="item">
        <img src={img1} alt="아이템1" />
        <div className="item-text">
          <h2 className="title">Hot Item</h2>
          <h3 className="subtitle">인기 상품을 <span className="break-on-desktop"><br /></span>확인해보세요</h3>
          <p className="description">가장 HOT한 중고거래 물품을<br />판다 마켓에서 확인해 보세요</p>
        </div>
      </div>
      <div className="item">
        <img src={img2} alt="아이템2" />
        <div className="item-text right">
          <h2 className="title">Search</h2>
          <h3 className="subtitle">구매를 원하는 <span className="break-on-desktop"><br /></span>상품을 검색하세요</h3>
          <p className="description">구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요</p>
        </div>
      </div>
      <div className="item">
        <img src={img3} alt="아이템3" />
        <div className="item-text">
          <h2 className="title">Register</h2>
          <h3 className="subtitle">판매를 원하는 <span className="break-on-desktop"><br /></span>상품을 등록하세요</h3>
          <p className="description">어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요</p>
        </div>
      </div>
    </section>
  );
};

export default BannerMiddle;