import Logo from "@/public/images/logo/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StyledLink } from "@/styles/CommonStyles";

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

function getLinkStyle(isActive: boolean) {
  return { color: isActive ? "var(--blue)" : undefined };
}

const Header: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <GlobalHeader>
      <HeaderLeft>
        <HeaderLogo href="/" aria-label="홈으로 이동">
          <Image alt="판다마켓로고" src={Logo} />
        </HeaderLogo>

        <nav>
          <NavList>
            <NavItem>
              <Link href="/boards" style={getLinkStyle(pathname === "/boards")}>
                자유게시판
              </Link>
            </NavItem>
            <NavItem>
              <Link
                href="/items"
                style={getLinkStyle(
                  pathname.includes("/items") || pathname === "/additem"
                )}
              >
                중고마켓
              </Link>
            </NavItem>
          </NavList>
        </nav>
      </HeaderLeft>

      <LoginLink href="/login">로그인</LoginLink>
    </GlobalHeader>
  );
};

export default Header;
