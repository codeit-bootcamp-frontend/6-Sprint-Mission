import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo/logo.svg";
import LogInImage from "../../assets/images/ui/ic_profile.svg";
import "./Header.css";

interface NavLinkProps {
  isActive: boolean;
}

function getLinkStyle({ isActive }: NavLinkProps) {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(accessToken ? true : false);
  }, []);

  return (
    <header className="globalHeader">
      <div className="headerLeft">
        <Link to="/" className="headerLogo" aria-label="홈으로 이동">
          <img src={Logo} alt="판다마켓 로고" width="153" />
        </Link>

        {isLoggedIn && (
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
                  style={({ isActive }: NavLinkProps) =>
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
        )}
      </div>

      {isLoggedIn ? (
        <div className="loginImageWrapper">
          <img
            src={LogInImage}
            alt="로그인 이미지"
            className="loginImage button"
          />
        </div>
      ) : (
        <Link to="/login" className="loginLink button">
          로그인
        </Link>
      )}
    </header>
  );
}

export default Header;
