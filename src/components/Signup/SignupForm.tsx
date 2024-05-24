import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eyeInvisible from "../../assets/icon/eye-invisible.svg";
import eyeVisible from "../../assets/icon/eye-visible.svg";

export default function SignupForm(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);
  const navigate = useNavigate();

  function validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("이메일을 입력하세요.");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  }

  function validateNickname(): boolean {
    if (!nickname) {
      setNicknameError("닉네임을 입력하세요.");
      return false;
    } else {
      setNicknameError("");
      return true;
    }
  }

  function validatePassword(): boolean {
    if (!password) {
      setPasswordError("비밀번호를 입력하세요.");
      return false;
    } else if (password.length < 8) {
      setPasswordError("비밀번호는 최소 8자 이상이어야 합니다.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  }

  function validatePasswordConfirm(): boolean {
    if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      setPasswordConfirmError("");
      return true;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (
      validateEmail() &&
      validateNickname() &&
      validatePassword() &&
      validatePasswordConfirm()
    ) {
      navigate("/items");
    }
  }

  function togglePasswordVisibility(): void {
    setShowPassword(!showPassword);
  }

  function togglePasswordConfirmVisibility(): void {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  return (
    <form id="signupForm" className="signin-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="signin-label">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해 주세요."
          className="signin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          style={{ border: emailError ? "1px solid #f74747" : "none" }}
        />
        {emailError && (
          <span id="email-Error" className="Error-message">
            {emailError}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="nickname" className="signin-label">
          닉네임
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해 주세요."
          className="signin-input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={validateNickname}
          style={{ border: nicknameError ? "1px solid #f74747" : "none" }}
        />
        {nicknameError && (
          <span id="nickname-Error" className="Error-message">
            {nicknameError}
          </span>
        )}
      </div>
      <div className="signin-pwd">
        <label htmlFor="pwd" className="signin-label">
          비밀번호
        </label>
        <input
          id="pwd"
          name="pwd"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력해 주세요."
          className="signin-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
          style={{ border: passwordError ? "1px solid #f74747" : "none" }}
        />
        <img
          id="pwd-toggle"
          src={showPassword ? eyeVisible : eyeInvisible}
          className="pwd-toggle"
          alt="비밀번호 토글"
          onClick={togglePasswordVisibility}
        />
        {passwordError && (
          <span id="pwd-Error" className="Error-message">
            {passwordError}
          </span>
        )}
      </div>
      <div className="signin-pwd">
        <label htmlFor="pwd-same" className="signin-label">
          비밀번호 확인
        </label>
        <input
          id="pwd-same"
          name="pwd-same"
          type={showPasswordConfirm ? "text" : "password"}
          placeholder="비밀번호를 다시 한 번 입력해 주세요."
          className="signin-input"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          onBlur={validatePasswordConfirm}
          style={{
            border: passwordConfirmError ? "1px solid #f74747" : "none",
          }}
        />
        <img
          id="pwd-same-toggle"
          src={showPasswordConfirm ? eyeVisible : eyeInvisible}
          className="pwd-toggle"
          alt="비밀번호 토글"
          onClick={togglePasswordConfirmVisibility}
        />
        {passwordConfirmError && (
          <span id="pwd-same-Error" className="Error-message">
            {passwordConfirmError}
          </span>
        )}
      </div>
      <button type="submit" className="signin-btn btn">
        회원가입
      </button>
    </form>
  );
}
