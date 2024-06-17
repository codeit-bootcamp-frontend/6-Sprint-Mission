import { Link, NavLink } from 'react-router-dom';
import Logo from '@/assets/images/logo.png';
import LogoMobile from '@/assets/images/logo_m.png';
import Profile from '@/assets/images/profile.png';
import styles from '@/styles/Header.module.css';

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? '#3692FF' : undefined,
  };
}

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <Link to="/" className={styles.header_logo}>
          <img src={Logo} alt="로고" className={styles.pc_ver} />
          <img
            src={LogoMobile}
            alt="모바일 로고"
            className={styles.mobile_ver}
          />
        </Link>
        <nav>
          <ul className={styles.gnb}>
            <li>
              <NavLink to="/board" style={getLinkStyle}>
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
      <Link to="#">
        <img src={Profile} alt="프로필 아이콘" />
      </Link>
    </header>
  );
}

export default Header;
