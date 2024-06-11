import React from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";
import ImgHomeTop from "../../assets/logo/Img_home_top.png";
import ImgHome01 from "../../assets/logo/Img_home_01.jpg";
import ImgHome02 from "../../assets/logo/Img_home_02.jpg";
import ImgHome03 from "../../assets/logo/Img_home_03.jpg";
import ImgHomeBottom from "../../assets/logo/Img_home_bottom.png";
import FacebookIcon from "../../assets/logo/ic_facebook.png";
import TwitterIcon from "../../assets/logo/ic_twitter.png";
import YoutubeIcon from "../../assets/logo/ic_youtube.png";
import InstagramIcon from "../../assets/logo/ic_instagram.png";

export default function Main() {
  const navigate = useNavigate();

  return (
    <main>
      <div className="banner top">
        <div className="banner-center">
          <div className="banner-section">
            <h1 id="banner-text">
              일상의 모든 물건을 <br /> 거래해 보세요
            </h1>
            <button
              className="explore-btn"
              type="button"
              onClick={() => navigate("/items")}
            >
              구경하러 가기
            </button>
          </div>
          <img src={ImgHomeTop} alt="배너 이미지" />
        </div>
      </div>

      <section className="main-middle">
        <div className="content">
          <img src={ImgHome01} alt="이미지 1" />
          <div className="section-text">
            <p className="small-text">Hot item</p>
            <h1>
              인기 상품을
              <br /> 확인해 보세요
            </h1>
            <h2>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </h2>
          </div>
        </div>

        <div className="content middle">
          <div className="section-text">
            <p className="small-text">Search</p>
            <h1>
              구매를 원하는
              <br /> 상품을 검색하세요
            </h1>
            <h2>
              구매하고 싶은 물품을 검색해서
              <br />
              쉽게 찾아보세요
            </h2>
          </div>
          <img src={ImgHome02} alt="이미지 2" />
        </div>

        <div className="content">
          <img src={ImgHome03} alt="이미지 3" />
          <div className="section-text">
            <p className="small-text">Register</p>
            <h1>
              판매를 원하는
              <br /> 상품을 등록하세요
            </h1>
            <h2>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </h2>
          </div>
        </div>
      </section>

      <div className="banner bottom">
        <div className="banner-center">
          <h1 className="bottom-text">
            믿을 수 있는
            <br />
            중고마켓 중고거래
          </h1>
          <img src={ImgHomeBottom} alt="배너 이미지" />
        </div>
      </div>

      <footer>
        <div className="nav-footer">
          <div className="made-name">©codeit - 2024</div>
          <div className="page-text">
            <a href="./privacy.html">Privacy Policy</a>
            <a href="./faq.html">FAQ</a>
          </div>
          <div className="ico-social">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={FacebookIcon} alt="페이스북" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={TwitterIcon} alt="트위터" />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={YoutubeIcon} alt="유튜브" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={InstagramIcon} alt="인스타그램" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
