import React from "react";
import Logo from "../public/logo.svg";
import Link from "next/link";
import "./Heaer.module.css";

function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  return (
    <header className="globalHeader">
      <div className="headerLeft">
        <Link
          to="/"
          className="headerLogo"
          aria-label="홈으로 이동"
          href="/index"
        >
          <img src={Logo} alt="판다마켓 로고" width="153" />
        </Link>

        <nav>
          <ul>
            <li>
              <Link href="/boards">자유게시판</Link>
            </li>
            <li>
              <Link href="/items" style={getLinkStyle}>
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Link href="/login" className="loginLink button">
        로그인
      </Link>
    </header>
  );
}

export default Header;
