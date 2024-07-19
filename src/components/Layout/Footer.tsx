import styled from "styled-components";
import facebookLogo from "../../assets/images/social/facebook-logo.svg";
import twitterLogo from "../../assets/images/social/twitter-logo.svg";
import youtubeLogo from "../../assets/images/social/youtube-logo.svg";
import instagramLogo from "../../assets/images/social/instagram-logo.svg";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
  background-color: var(--gray-900);
  color: var(--gray-400);
  font-size: 16px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 60px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 32px 104px 108px 104px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    padding: 32px 200px 108px 200px;
  }
`;

const Copyright = styled.div`
  order: 3;
  flex-basis: 100%;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-basis: auto;
    order: 0;
  }
`;

const FooterMenu = styled.div`
  display: flex;
  gap: 30px;
  color: var(--gray-200);
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 12px;
`;

const Footer: React.FC = () => (
  <FooterContainer>
    <Copyright>©codeit - 2024</Copyright>

    <FooterMenu>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/faq">FAQ</Link>
    </FooterMenu>

    <SocialMedia>
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 페이스북"
      >
        <img src={facebookLogo} alt="페이스북" width="20" />
      </a>
      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 트위터"
      >
        <img src={twitterLogo} alt="트위터" width="20" />
      </a>
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 유튜브"
      >
        <img src={youtubeLogo} alt="유튜브" width="20" />
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 인스타그램"
      >
        <img src={instagramLogo} alt="인스타그램" width="20" />
      </a>
    </SocialMedia>
  </FooterContainer>
);

export default Footer;
