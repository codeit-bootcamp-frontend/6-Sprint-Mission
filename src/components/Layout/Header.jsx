import React from "react";
import Logo from "../../assets/images/logo/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

// react-router-dom의 NavLink를 이용하면 활성화된 네비게이션 항목을 하이라이트해줄 수 있어요!
function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  return (
    <header className="globalHeader">
      <div className="headerLeft">
        <Link to="/" className="headerLogo" aria-label="홈으로 이동">
          <img src={Logo} alt="판다마켓 로고" width="153" />
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
  );
}

export default Header;
