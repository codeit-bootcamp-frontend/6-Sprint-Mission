import React, { useEffect, useState } from "react";
import eyeInvisible from "@/public/icon/eye-invisible.svg";
import eyeVisible from "@/public/icon/eye-visible.svg";
import styles from "@/styles/signin.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "@/utils/axios";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function postSignIn(): Promise<void> {
    try {
      const res = await axios.post("auth/signIn", {
        email: email,
        password: password,
      });
      const accessToken = res.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      const profileImg = res.data.user.image;
      localStorage.setItem("profileImg", profileImg);
      alert("로그인 성공");
      router.push("/boards");
    } catch (error) {
      console.error(error);
      alert("제대로 입력 ㄱ");
      return ;
    }
  }

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
      postSignIn();
    }
  }

  function togglePasswordVisibility(): void {
    setShowPassword(!showPassword);
  }

  return (
    <form className={styles.signin_form} onSubmit={handleSubmit}>
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
      <button type="submit" className={`${styles.signin_btn} ${styles.btn}`}>
        로그인
      </button>
    </form>
  );
}
