import { Link, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DefaultButton from '../common/DefaultButton';
import logo from '../assets/pandaLogo.svg';
import logoWithoutPanda from '../assets/logo.svg';
import profile from '../assets/profileIcon.svg';

function Nav() {
  const { pathname } = useLocation();
  const accessToken = localStorage.getItem('accessToken');

  return (
    <StyledNav>
      <ListContainer>
        <LogoContainer>
          <Img src={logo} alt="판다마켓 로고" />
        </LogoContainer>
        <StyledNavLink to="/board" $isActive={pathname === '/board'}>
          자유게시판
        </StyledNavLink>
        <StyledNavLink to="/items" $isActive={pathname === '/additem' ? true : false}>
          중고마켓
        </StyledNavLink>
      </ListContainer>
      {accessToken ? (
        <img src={profile} alt="프로필 아이콘" />
      ) : (
        <Link to="/signin">
          <StyledButton>로그인</StyledButton>
        </Link>
      )}
    </StyledNav>
  );
}

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 200px;
  border: 1px solid #dfdfdf;

  @media ${(props) => props.theme.mobile} {
    padding: 16px 21px;
  }
  @media ${(props) => props.theme.tablet} {
    padding: 10px 24px;
  }
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
`;

const Img = styled.img`
  @media ${(props) => props.theme.mobile} {
    content: url(${logoWithoutPanda});
  }
`;

const StyledNavLink = styled(NavLink)<{ $isActive: boolean }>`
  font-size: 18px;
  font-weight: 700;
  line-height: 21.48px;
  color: ${({ $isActive }) => ($isActive ? 'var(--main-color)' : 'var(--nav-text-color)')};
  margin-left: 47px;

  &:not(:first-of-type) {
    margin-left: 39px;
  }

  &.active {
    color: var(--main-color);
  }

  @media ${(props) => props.theme.mobile} {
    margin-left: 15px;

    &:not(:first-of-type) {
      margin-left: 8px;
    }
  }
  @media ${(props) => props.theme.tablet} {
    margin-left: 39px;

    &:not(:first-of-type) {
      margin-left: 35px;
    }
  }
`;

const StyledButton = styled(DefaultButton)`
  background-color: var(--main-color);
`;

export default Nav;
