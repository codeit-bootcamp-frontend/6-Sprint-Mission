import googleIcon from "@/assets/icons/google_ic.svg";
import kakaoIcon from "@/assets/icons/kakao_ic.svg";
import { socialLoginStyle } from "@/css/common/sign.styled";
import { css } from "@/styled-system/css";
import { hstack } from "@/styled-system/patterns";
import Image from "next/image";

function SocialLogin() {
  return (
    <div className={socialLoginStyle}>
      <p className={css({ fontWeight: "bold" })}>간편 로그인하기</p>
      <div className={hstack()}>
        <a href="https://www.google.com/">
          <Image src={googleIcon} alt="구글 로그인" />
        </a>
        <a href="https://www.kakaocorp.com/page/">
          {" "}
          <Image src={kakaoIcon} alt="카카오 로그인" />
        </a>
      </div>
    </div>
  );
}

export default SocialLogin;
