import Logo from '../../assets/images/logo/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function clickLinkStyle({ isActive }) {
  return { color: isActive ? 'var(--blue)' : undefined };
}

function Header() {
  return (
    <header className="mainHeader">
      <div className="headerLeft">
        <Link
          to="/"
          className="headerLogo"
          aria-label="홈으로 이동"
        >
          <img
            src={Logo}
            alt="판다마켓 로고"
            width="153"
          />
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/community"
                style={clickLinkStyle}
              >
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/items"
                style={clickLinkStyle}
              >
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Link
        to="/login"
        id="loginLink"
        className="button"
      >
        로그인
      </Link>
    </header>
  );
}

export default Header;
