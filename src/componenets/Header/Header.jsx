import "./Header.css";
import Logo from "../../images/logo/og-image.png";
import { Link, NavLink } from "react-router-dom";
import React from "react";

function ActiveLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

function header() {
  return (
    <header className="globalHeader">
      <div className="pandamarketlogo">
        <Link to="/" className="headerlogo" aria-label="홈으로 이동">
          <img src={Logo} alt="판다마켓 로고" width="153" />
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink to="/freeAnnounce" style={ActiveLinkStyle}>
                자유게시판
              </NavLink>
              <NavLink to="/items" style={ActiveLinkStyle}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link to="/login" id="loginLink" className="loginButton">
          로그인
        </Link>
      </div>
    </header>
  );
}

export default header;
