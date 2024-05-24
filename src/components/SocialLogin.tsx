import React from "react";
import googleLogo from "../assets/icon/google-logo.png";
import kakaoLogo from "../assets/icon/kakao-logo.png";

export default function SocialLogin(): JSX.Element {
  return (
    <div className="social-login">
      <div>
        <p>간편 로그인하기</p>
      </div>
      <div className="social-login-img">
        <div>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={googleLogo} alt="구글로그인" width="42px" />
          </a>
        </div>
        <div>
          <a
            href="https://www.kakaocorp.com/page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={kakaoLogo} alt="카카오로그인" width="42px" />
          </a>
        </div>
      </div>
    </div>
  );
}
