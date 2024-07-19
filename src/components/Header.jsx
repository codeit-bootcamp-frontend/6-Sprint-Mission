import "./Header.css";
import pandaFace from "../assets/panda-face.png";
import { Link, NavLink } from "react-router-dom";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "#3692FF" : "#4B5563",
  };
}

function Header() {
  return (
    <header className='gnb'>
      <ul className='nav'>
        <li className='left-nav'>
          <Link to='/'>
            <div className='panda-logo'>
              <img src={pandaFace} alt='판다얼굴' />
              <h1>판다마켓</h1>
            </div>
          </Link>
          <div className='menu-list'>
            <h2>
              <NavLink to='/freeCommunity' style={getLinkStyle}>
                자유게시판
              </NavLink>
            </h2>
            <h2>
              <NavLink to='items' style={getLinkStyle}>
                중고마켓
              </NavLink>
            </h2>
          </div>
        </li>
        <li className='right-nav'>
          <Link to='/signIn'>로그인</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
