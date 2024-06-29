import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import "./Header.css";

function getLinkStyle({ isActive }) {
  return { color: isActive ? "blue" : undefined };
}

function Header(props) {
  const nav = useNavigate()

  return (
    <div className="Header">
      <div className="HeaderLeft">
        <Link to="/" className="HeaderLogo">
          <img src={logo} alt="판다마켓 로고" />
        </Link>
        <div className="HeaderLink">
          <NavLink to="/community" className="HeaderLinkInner"style={getLinkStyle}>
            자유게시판
          </NavLink>
          <NavLink to="/items" className="HeaderLinkInner" style={getLinkStyle}>
            중고마켓
          </NavLink>
        </div>
      </div>
      <button className="loginButton" onClick={() => {
              nav('/login');
            }}>
        로그인
      </button>
    </div>
  );
}

export default Header;
