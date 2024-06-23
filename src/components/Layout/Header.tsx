import React from 'react';
import Logo from "../../assets/images/logo/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useState } from 'react';
import loginPic from '../../assets/images/icons/user_icon.svg'
import styled from 'styled-components';

const UserLogo = styled.div`
  padding-right: 40px;
`

// react-router-dom의 NavLink를 이용하면 활성화된 네비게이션 항목을 하이라이트해줄 수 있어요!
function getLinkStyle({ isActive }: { isActive: boolean }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  const [login, setLogin] = useState("user");
  const handleUserClick=() => {
    if(login === 'user') {
      setLogin("로그인")
    } else {
      setLogin('user');
    }
  }
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
              <NavLink  className={`${window.location.pathname === "/additem" ? "blue" : ""}`} to="/items" style={getLinkStyle}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <UserLogo onClick={handleUserClick}>
        {login === "로그인"? <Link to="/additem" className="loginLink button">
        로그인
      </Link>: <img src={loginPic} alt="" />}
      </UserLogo>
    </header>
  );
}

export default Header;
