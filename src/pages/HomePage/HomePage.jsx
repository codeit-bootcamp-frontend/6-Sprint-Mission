import React from "react";
import { Link, Routes, Route, NavLink } from "react-router-dom";
import "./HomePage.css";
import LoginPage from "../LoginPage/LoginPage";

function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

function HomePage() {
  return (
    <div>
      <header className="globalHeader">
        <div className="headerLeft">
          <Link to="/" className="headerLogo" aria-label="홈으로 이동">
            <img
              src={process.env.PUBLIC_URL + "/images/logo/logo.svg"}
              alt="판다마켓 홈"
              width="153"
            />
          </Link>

          <nav>
            <ul>
              <li>
                <NavLink to="/community" style={getLinkStyle}>
                  자유게시판
                </NavLink>
              </li>
              <li>
                <NavLink to="/items" style={getLinkStyle}>
                  중고마켓
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <Link to="/login" className="loginLink button">
          로그인
        </Link>
      </header>

      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <footer>
        <div id="copyright">©codeit - 2024</div>
        <div id="footerMenu">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div id="socialMedia">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/images/social/facebook-logo.svg"}
              alt="페이스북"
              width="20"
            />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/images/social/twitter-logo.svg"}
              alt="트위터"
              width="20"
            />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/images/social/youtube-logo.svg"}
              alt="유튜브"
              width="20"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/images/social/instagram-logo.svg"}
              alt="인스타그램"
              width="20"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <>
      <section
        id="hero"
        className="banner"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/home/hero-image.png)`,
        }}
      >
        <div className="wrapper">
          <h1>
            일상의 모든 물건을
            <br />
            거래해 보세요
          </h1>
          <Link to="/items" className="button pill-button">
            구경하러 가기
          </Link>
        </div>
      </section>

      <section id="features" className="wrapper">
        <div className="feature">
          <img
            src={process.env.PUBLIC_URL + "/images/home/feature1-image.png"}
            alt="인기 상품"
          />
          <div className="feature-content">
            <h2>Hot item</h2>
            <h1>
              인기 상품을
              <br />
              확인해 보세요
            </h1>
            <p className="feature-description">
              가장 HOT한 중고거래 물품을
              <br />
              판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>
        <div className="feature">
          <img
            src={process.env.PUBLIC_URL + "/images/home/feature2-image.png"}
            alt="검색 기능"
          />
          <div className="feature-content">
            <h2>Search</h2>
            <h1>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h1>
            <p className="feature-description">
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>
        <div className="feature">
          <img
            src={process.env.PUBLIC_URL + "/images/home/feature3-image.png"}
            alt="판매 상품 등록"
          />
          <div className="feature-content">
            <h2>Register</h2>
            <h1>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h1>
            <p className="feature-description">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section id="bottomBanner" className="banner">
        <div className="wrapper">
          <h1>
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </h1>
        </div>
      </section>
    </>
  );
}

export default HomePage;
