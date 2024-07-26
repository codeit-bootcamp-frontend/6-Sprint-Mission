import React from "react";
import Logo from "../../assets/images/logo/logo.svg";
import { Link, NavLink, useLocation, Location } from "react-router-dom";
import "./Header.css";

interface LinkStyleProps {
  isActive: boolean;
}

function getLinkStyle({ isActive }: LinkStyleProps): React.CSSProperties {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  const location: Location = useLocation();

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
