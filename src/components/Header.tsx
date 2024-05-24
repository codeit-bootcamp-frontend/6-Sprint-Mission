import React from "react";
import MainLogo from "../assets/icon/main_logo.svg";
import SmallMainLogo from "../assets/icon/main_logo_small.svg";
import { Link, useLocation } from "react-router-dom";
import "../style/header.css";
import LinkButton from "../common/Button";

export default function NavBar(): JSX.Element {
  const location = useLocation();
  return (
    <nav className="navvar">
      <Link to="/">
        <img className="mainlogo" src={MainLogo} alt="로고" />
        <img className="mainlogo" src={SmallMainLogo} alt="로고" />
      </Link>
      <div className="menus">
        <Link to="/">
          <span>자유게시판</span>
        </Link>
        <Link
          to="/items"
          className={
            location.pathname.startsWith("/items") ||
            location.pathname === "/additem"
              ? "focus"
              : ""
          }
        >
          <span>중고마켓</span>
        </Link>
      </div>
      <LinkButton to="/signin">로그인</LinkButton>
    </nav>
  );
}
