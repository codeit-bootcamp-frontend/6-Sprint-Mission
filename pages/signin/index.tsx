import React, { ChangeEvent, useState } from "react";
import ic_kakao from "@/images/ic_kakao.png";
import ic_google from "@/images/ic_google.png";
import ic_hidden from "@/images/btn_visibility_off.svg";
import ic_visible from "@/images/btn_visibility_on.svg";
import logo from "@/images/login_logo.png";
import { validateEmailAddress, validatePassword } from "@/utils/validateLogin";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.css";
import postSignin from "@/apis/postSignin";
import { FormEvent } from 'react';

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [passWord, setPassWord] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const eyeIcon = visible ? ic_visible : ic_hidden;

  const buttonActivate: boolean =
    validateEmailAddress(email) && validatePassword(passWord);

  const emailErrorMessage: string =
    email === ""
      ? "이메일을 입력해주세요"
      : validateEmailAddress(email)
      ? ""
      : "잘못된 이메일 형식입니다";

  const passWordErrorMessage: string =
    passWord === ""
      ? "비밀번호을 입력해주세요"
      : validatePassword(passWord)
      ? ""
      : "비밀번호를 8자 이상 입력해주세요";

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassWord(e.target.value);
  };
  const handleVisibleBtn = () => {
    setVisible((prev) => !prev);
  };

  const handleSignInButton = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await postSignin({
        email: email,
        password: passWord,
      });
      // 결과에서 accessToken 가져오기
      const accessToken = result.accessToken;

      // 로컬 스토리지에 accessToken 저장
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <div className={styles.sign_header}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} alt="판다마켓 로고" />
          </Link>
        </div>
      </div>
      <main className={styles.sign_main}>
        <div className={styles.login_content}>
          <form className={styles.login_form}>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userEmail">이메일</label>
                <input
                  id="userEmail"
                  type="email"
                  name="userEmail"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={handleEmailInput}
                />
              </div>
              <span className={styles.input_err_message}>
                {emailErrorMessage}
              </span>
            </div>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userPassword">비밀번호</label>
                <input
                  id="userPassword"
                  type={visible ? "text" : "password"}
                  name="userPassword"
                  placeholder="비밀번호를 입력해주세요"
                  value={passWord}
                  onChange={handlePassWordInput}
                />
                <Image
                  src={eyeIcon}
                  className={styles.password_visible_btn}
                  alt="비밀번호 숨기기 버튼"
                  onClick={handleVisibleBtn}
                />
              </div>
              <span className={styles.input_err_message}>
                {passWordErrorMessage}
              </span>
            </div>
            <button disabled={!buttonActivate} onClick={handleSignInButton}>
              로그인
            </button>
          </form>
          <div className={styles.login_easy}>
            <span>간편 로그인하기</span>
            <div className={styles.sns_icon}>
              <Link href="https://www.google.com/">
                <Image src={ic_google} alt="구글 아이콘" />
              </Link>
              <Link href="https://www.kakaocorp.com/page/">
                <Image src={ic_kakao} alt="카카오 아이콘" />
              </Link>
            </div>
          </div>
          <div className={styles.login_first}>
            <span>판다마켓이 처음이신가요?</span>
            <Link href="/signup">회원가입</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signin;
