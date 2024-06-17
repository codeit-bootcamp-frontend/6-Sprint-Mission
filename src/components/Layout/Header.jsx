import React from "react";
import Logo from "../../assets/images/logo/logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";

// react-router-dom의 NavLink를 이용하면 활성화된 네비게이션 항목을 하이라이트해줄 수 있어요!
function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  const location = useLocation(); // 현재 경로 정보

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
              {/* React Router v6 이전 버전에서는 NavLink `isActive` prop으로 바로 스타일 정보를 넣어줄 수 있었지만, 최신 버전에서는 className 또는 style을 이용해야 해요 */}
              {/* /additem 페이지에서도 네이게이션의 '중고마켓' 링크 하이라이트 */}
              <NavLink
                to="/items"
                style={({ isActive }) =>
                  location.pathname === "/additem" || isActive
                    ? { color: "var(--blue)" }
                    : {}
                }
              >
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
