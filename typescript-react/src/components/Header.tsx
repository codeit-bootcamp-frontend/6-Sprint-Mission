import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import logo from "./src/assets/img/logo.png";
import btn from "./src/assets/img/btn_login.png";

function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  return (
    <header className="Header">
      <div className="headerleft">
        <Link to="/" className="headerlogo">
          <img src={logo} alt="판다마켓 로고" width="153" />
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink to="./community" style={getLinkStyle}>
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
        <img src={btn} alt="로그인 버튼" />
      </Link>
    </header>
  );
}

export default Header;
