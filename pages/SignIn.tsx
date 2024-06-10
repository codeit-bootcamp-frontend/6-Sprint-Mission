import styles from "@/styles/SignIn.module.css";
import React, { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "@/lib/apis/sign.api";
import { useRouter } from "next/router";

const SignIn = () => {
  const [isSignInBtnDisabled, setIsSignInBtnDisabled] = useState(true);
  const [isPwShow, setIsPwShow] = useState(false);
  const router = useRouter();

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPw, setIsValidPw] = useState(true);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const validOption = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pw: /.{8,}/,
  };

  useEffect(() => {
    if (isValidEmail && isValidPw && userInfo.email && userInfo.password) {
      setIsSignInBtnDisabled(false);
    } else {
      setIsSignInBtnDisabled(true);
    }
  }, [isValidEmail, isValidPw]);

  const setInputValueToUserInfo = (category: string, value: string) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [category]: value,
    }));
  };

  const checkInputValidity = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === "email") {
      setInputValueToUserInfo("email", value);
      const isValid = validOption.email.test(value);
      setIsValidEmail(isValid ? true : false);
    } else {
      setInputValueToUserInfo("password", value);
      const isValid = validOption.pw.test(value);
      setIsValidPw(isValid ? true : false);
    }
  };

  const handlePwShow = () => {
    setIsPwShow(!isPwShow);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn(userInfo);
      if (res) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        router.push("/");
      }
    } catch (e) {
      console.error(`Error : ${e}`);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className={styles["sign-in-container"]}>
      <div className={styles["sign-in-container__logo"]}>
        <Link href="/">
          <Image
            src="/images/Sign/panda-market-logo.png"
            alt="판다마켓 로고 겸 메인 페이지 이동 버튼"
            fill
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>

      <form action="#" method="post" className={styles["sign-in-from"]} onSubmit={handleSubmit}>
        <div className={styles["con"]}>
          <label htmlFor="email" className={styles["sign-email-label"]}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            autoFocus
            onChange={checkInputValidity}
            className={styles[isValidEmail ? "sign-email-input" : "sign-email-input-wrong"]}
          />
          {isValidEmail || (
            <span className={styles["wrong-email"]}>
              {userInfo.email === "" ? "이메일을 입력해주세요" : "잘못된 이메일 형식입니다"}
            </span>
          )}
        </div>

        <div className={styles["con"]}>
          <label htmlFor="pw" className={styles["sign-pw-label"]}>
            비밀번호
          </label>
          <input
            type={isPwShow ? "text" : "password"}
            id="pw"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={checkInputValidity}
            className={styles[isValidPw ? "sign-pw-input" : "sign-pw-input-wrong"]}
          />
          {isPwShow ? (
            <Image
              src="/images/Sign/show-icon.svg"
              alt="비밀번호 보이기 버튼"
              width={24}
              height={24}
              className={styles["show-icon"]}
              onClick={handlePwShow}
            ></Image>
          ) : (
            <Image
              src="/images/Sign/none-show-icon.svg"
              alt="비밀번호 숨기기 버튼"
              width={24}
              height={24}
              className={styles["none-show-icon"]}
              onClick={handlePwShow}
            ></Image>
          )}
          {isValidPw || (
            <span className={styles["wrong-pw"]}>
              {userInfo.password === "" ? "비밀번호를 입력해주세요" : "비밀번호를 8자 이상 입력해주세요"}
            </span>
          )}
        </div>

        <button disabled={isSignInBtnDisabled} className={styles["login-btn"]}>
          로그인
        </button>

        <div className={styles["social-login"]}>
          <p>간편 로그인하기</p>
          <div className={styles["social-login-logo"]}>
            <Link href="https://accounts.google.com/signin/v2/usernamerecovery?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&hl=ko&theme=glif&ddm=0&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
              <Image src="/images/Sign/google-logo.png" alt="구글 로그인 이동하기 버튼" width={42} height={42}></Image>
            </Link>
            <Link href="https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fproxy%3DeasyXDM_Kakao_9iyy5od3l29_provider%26ka%3Dsdk%252F1.43.2%2520os%252Fjavascript%2520sdk_type%252Fjavascript%2520lang%252Fko-KR%2520device%252FWin32%2520origin%252Fhttps%25253A%25252F%25252Fwww.epis.or.kr%26origin%3Dhttps%253A%252F%252Fwww.epis.or.kr%26response_type%3Dcode%26redirect_uri%3Dkakaojs%26state%3Dlgo6gi4qr2byw694fiizh%26through_account%3Dtrue%26client_id%3D950f3ae1f2f550e5ba7ff7d9fffc7781&talk_login=hidden#login">
              <Image src="/images/Sign/kakao-logo.png" alt="구글 로그인 이동하기 버튼" width={42} height={42}></Image>
            </Link>
          </div>
        </div>

        <div className={styles["go-signup-container"]}>
          <p>판다마켓이 처음이신가요?</p>
          <Link href="/SignUp">회원가입</Link>
        </div>
      </form>
    </div>
  );
};

SignIn.noLayout = true;
export default SignIn;
