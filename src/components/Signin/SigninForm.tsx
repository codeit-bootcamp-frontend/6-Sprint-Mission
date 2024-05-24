import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eyeInvisible from "../../assets/icon/eye-invisible.svg";
import eyeVisible from "../../assets/icon/eye-visible.svg";

export default function SigninForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      navigate("/items");
    }
  }

  function togglePasswordVisibility(): void {
    setShowPassword(!showPassword);
  }

  return (
    <form id="signinForm" className="signin-form" onSubmit={handleSubmit}>
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
      <button type="submit" className="signin-btn btn">
        로그인
      </button>
    </form>
  );
}
