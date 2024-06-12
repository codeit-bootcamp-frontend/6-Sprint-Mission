import { useState } from "react";
import { useRouter } from "next/router";
import eyeInvisible from "@/public/icon/eye-invisible.svg";
import eyeVisible from "@/public/icon/eye-visible.svg";
import Image from "next/image";
import styles from "@/styles/signup.module.css";
import axios from "@/utils/axios";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const router = useRouter();

  function validateEmail() {
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

  function validateNickname() {
    if (!nickname) {
      setNicknameError("닉네임을 입력하세요.");
      return false;
    } else {
      setNicknameError("");
      return true;
    }
  }

  function validatePassword() {
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

  function validatePasswordConfirm() {
    if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      setPasswordConfirmError("");
      return true;
    }
  }

  async function postSignUp(): Promise<void> {
    try {
      const res = await axios.post("auth/signUp", {
        email: email,
        nickname: nickname,
        password: password,
        passwordConfirmation: passwordConfirm,
      });

      alert("회원가입 성공");
      router.push("/signin");
    } catch (error) {
      console.error(error);
      alert("제대로 입력 ㄱ");
      return;
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
      postSignUp();
    }
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function togglePasswordConfirmVisibility() {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  return (
    <form
      id="signupForm"
      className={styles.signin_form}
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="email" className={styles.signin_label}>
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해 주세요."
          className={styles.signin_input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          style={{ border: emailError ? "1px solid #f74747" : "none" }}
        />
        {emailError && (
          <span id="email-Error" className={styles.Error_message}>
            {emailError}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="nickname" className={styles.signin_label}>
          닉네임
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="닉네임을 입력해 주세요."
          className={styles.signin_input}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={validateNickname}
          style={{ border: nicknameError ? "1px solid #f74747" : "none" }}
        />
        {nicknameError && (
          <span id="nickname-Error" className={styles.Error_message}>
            {nicknameError}
          </span>
        )}
      </div>
      <div className={styles.signin_pwd}>
        <label htmlFor="pwd" className={styles.signin_label}>
          비밀번호
        </label>
        <input
          id="pwd"
          name="pwd"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력해 주세요."
          className={styles.signin_input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
          style={{ border: passwordError ? "1px solid #f74747" : "none" }}
        />
        <Image
          id="pwd-toggle"
          src={showPassword ? eyeVisible : eyeInvisible}
          className={styles.pwd_toggle}
          alt="비밀번호 토글"
          onClick={togglePasswordVisibility}
        />
        {passwordError && (
          <span id="pwd-Error" className={styles.Error_message}>
            {passwordError}
          </span>
        )}
      </div>
      <div className={styles.signin_pwd}>
        <label htmlFor="pwd-same" className={styles.signin_label}>
          비밀번호 확인
        </label>
        <input
          id="pwd-same"
          name="pwd-same"
          type={showPasswordConfirm ? "text" : "password"}
          placeholder="비밀번호를 다시 한 번 입력해 주세요."
          className={styles.signin_input}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          onBlur={validatePasswordConfirm}
          style={{
            border: passwordConfirmError ? "1px solid #f74747" : "none",
          }}
        />
        <Image
          id="pwd-same-toggle"
          src={showPasswordConfirm ? eyeVisible : eyeInvisible}
          className={styles.pwd_toggle}
          alt="비밀번호 토글"
          onClick={togglePasswordConfirmVisibility}
        />
        {passwordConfirmError && (
          <span id="pwd-same-Error" className={styles.Error_message}>
            {passwordConfirmError}
          </span>
        )}
      </div>
      <button type="submit" className={`${styles.signin_btn} ${styles.btn}`}>
        회원가입
      </button>
    </form>
  );
}
