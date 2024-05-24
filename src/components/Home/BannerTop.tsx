import React from "react";
import { Link } from "react-router-dom";

const BannerTop:React.FC = () => {
  return (
    <section className="banner-top">
      <div>
        <h1>
          일상의 모든 물건을 <br />
          거래해보세요
        </h1>
        <Link to="/items" className="btn-items btn">
          구경하러가기
        </Link>
      </div>
    </section>
  );
}

export default BannerTop;