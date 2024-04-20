import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../LoginPage/LoginPage.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value.trim());
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("이메일을 입력해 주세요.");
    } else if (!isValidEmail(email)) {
      setEmailError("잘못된 이메일 형식입니다.");
    } else {
      setEmailError("");
    }
    toggleButtonState();
  };

  const validateNickname = () => {
    if (!nickname) {
      setNicknameError("닉네임을 입력해 주세요.");
    } else {
      setNicknameError("");
    }
    toggleButtonState();
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("비밀번호를 입력해 주세요.");
    } else if (password.length < 8) {
      setPasswordError("비밀번호를 8 자 이상 입력해 주세요.");
    } else {
      setPasswordError("");
    }
    toggleButtonState();
  };

  const validatePasswordConfirmation = () => {
    if (passwordConfirmation !== password) {
      setPasswordConfirmationError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmationError("");
    }
    toggleButtonState();
  };

  const toggleButtonState = () => {
    if (
      emailError ||
      nicknameError ||
      passwordError ||
      passwordConfirmationError ||
      !email ||
      !nickname ||
      !password ||
      !passwordConfirmation
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 회원가입 로직을 수행할 수 있습니다.
    console.log("회원가입 정보:", { email, nickname, password });
    // 실제로 서버로 회원가입 정보를 전송하는 등의 로직을 추가해야 합니다.
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
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
            placeholder="이메일을 입력해 주세요"
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>

        <div className="input-item">
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={validateNickname}
            placeholder="닉네임을 입력해 주세요"
          />
          {nicknameError && (
            <div className="error-message">{nicknameError}</div>
          )}
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
              {showPassword ? (
                <img
                  src="/images/icons/eye-visible.svg"
                  alt="비밀번호 숨기기"
                />
              ) : (
                <img
                  src="/images/icons/eye-invisible.svg"
                  alt="비밀번호 표시"
                />
              )}
            </span>
          </div>
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
        </div>

        <div className="input-item">
          <label htmlFor="passwordConfirmation">비밀번호 확인</label>
          <input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            onBlur={validatePasswordConfirmation}
            placeholder="비밀번호를 다시 한 번 입력해 주세요"
          />
          {passwordConfirmationError && (
            <div className="error-message">{passwordConfirmationError}</div>
          )}
        </div>

        <button
          type="submit"
          className="button pill-button full-width"
          disabled={buttonDisabled}
        >
          회원가입
        </button>
      </form>
      <div className="auth-switch">
        <div className="logo-placeholder" style={{ height: "30px" }}></div>
        이미 회원이신가요? <Link to="/login">로그인</Link>
      </div>
    </div>
  );
};

export default SignupPage;
