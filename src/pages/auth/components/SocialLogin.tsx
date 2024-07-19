import styled from "styled-components";
import googleLogo from "../../../assets/images/social/google-logo.png";
import kakaoLogo from "../../../assets/images/social/kakao-logo.png";

const Container = styled.div`
  background-color: #e6f2ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 23px;
  margin: 24px 0;
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

const SocialLoginLinksContainer = styled.div`
  display: flex;
  gap: 16px;
`;

interface SocialLoginLinkProps {
  name: string;
  url: string;
  logoSrc: string;
}

const SocialLoginLink: React.FC<SocialLoginLinkProps> = ({
  name,
  url,
  logoSrc,
}) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
      <img src={logoSrc} alt={name} width="42" />
    </a>
  );
};

const SocialLogin: React.FC = () => {
  return (
    <Container>
      <Title>간편 로그인하기</Title>

      <SocialLoginLinksContainer>
        <SocialLoginLink
          name="구글 로그인"
          url="https://www.google.com/"
          logoSrc={googleLogo}
        />
        <SocialLoginLink
          name="카카오톡 로그인"
          url="https://www.kakaocorp.com/page/"
          logoSrc={kakaoLogo}
        />
      </SocialLoginLinksContainer>
    </Container>
  );
};

export default SocialLogin;
