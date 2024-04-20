import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../LoginPage/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("이메일을 입력해 주세요.");
    } else if (!isValidEmail(email)) {
      setEmailError("잘못된 이메일 형식입니다.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("비밀번호를 입력해 주세요.");
    } else if (password.length < 8) {
      setPasswordError("비밀번호를 8 자 이상 입력해 주세요.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    validateEmail();
    validatePassword();

    // 로그인 처리 로직
    if (email && isValidEmail(email) && password && password.length >= 8) {
      console.log("로그인 시도:", email, password);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <div className="input-item">
          <div className="logo-placeholder" style={{ height: "50px" }}></div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>

        <div className="input-item">
          <label htmlFor="password">비밀번호</label>
          <div className="input-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onBlur={validatePassword}
              placeholder="비밀번호를 입력해 주세요"
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <img
                src={
                  showPassword
                    ? "/images/icons/eye-visible.svg"
                    : "/images/icons/eye-invisible.svg"
                }
                alt={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
              />
            </span>
          </div>
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
        </div>

        <button type="submit" className="button pill-button full-width">
          로그인
        </button>
      </form>

      <div className="social-login-container">
        <h3>간편 로그인하기</h3>
        <div className="social-login-buttons-container">
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/social/google-logo.png"
              alt="구글 로그인"
              width="42"
            />
          </a>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/social/kakao-logo.png"
              alt="카카오톡 로그인"
              width="42"
            />
          </a>
        </div>
      </div>

      <div className="auth-switch">
        판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginPage;
