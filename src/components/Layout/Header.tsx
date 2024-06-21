import Logo from "../../assets/images/logo/logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { StyledLink } from "../../styles/CommonStyles";

const GlobalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled(Link)`
  margin-right: 16px;

  @media (min-width: 768px) {
    margin-right: 35px;
  }

  @media (min-width: 1280px) {
    margin-right: 47px;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
  color: var(--gray-600);

  @media (min-width: 768px) {
    gap: 36px;
    font-size: 18px;
  }
`;

const NavItem = styled.li`
  a:hover {
    color: var(--blue);
  }
`;

const LoginLink = styled(StyledLink)``;

function getLinkStyle({ isActive }: { isActive: boolean }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <GlobalHeader>
      <HeaderLeft>
        <HeaderLogo to="/" aria-label="홈으로 이동">
          <img src={Logo} alt="판다마켓 로고" width="153" />
        </HeaderLogo>

        <nav>
          <NavList>
            <NavItem>
              <NavLink to="/community" style={getLinkStyle}>
                자유게시판
              </NavLink>
            </NavItem>
            <NavItem>
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
            </NavItem>
          </NavList>
        </nav>
      </HeaderLeft>

      <LoginLink to="/login">로그인</LoginLink>
    </GlobalHeader>
  );
};

export default Header;
