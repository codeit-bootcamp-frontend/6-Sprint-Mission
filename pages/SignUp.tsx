import styles from "@/styles/SignUp.module.css";
import React, { useState, useEffect, ChangeEvent, MouseEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { signUp } from "@/lib/apis/sign.api";
import { useRouter } from "next/router";

const SignUp = () => {
  const [isSignUpBtnDisabled, setIsSignUpBtnDisabled] = useState(true);

  const [isPwShow, setIsPwShow] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPw, setIsValidPw] = useState(true);
  const [isPwMatch, setIsPwMatch] = useState(true);
  const [isValidNickname, setIsValidNickname] = useState(true);

  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    nickname: "",
  });
  const router = useRouter();

  const validOption = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pw: /.{8,}/,
    nick: /^.+$/,
  };

  useEffect(() => {
    if (
      isValidEmail &&
      isValidPw &&
      isPwMatch &&
      isValidNickname &&
      signUpInfo.email &&
      signUpInfo.password &&
      signUpInfo.nickname &&
      signUpInfo.passwordConfirmation
    ) {
      setIsSignUpBtnDisabled(false);
    } else {
      setIsSignUpBtnDisabled(true);
    }
  }, [isValidEmail, isPwShow, isPwMatch, isValidNickname]);

  const setInputValueToSignUpInfo = (category: string, value: string) => {
    setSignUpInfo((prevSignUpInfo) => ({
      ...prevSignUpInfo,
      [category]: value,
    }));
  };

  const checkInputValidity = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === "email") {
      setInputValueToSignUpInfo("email", value);
      const isValid = validOption.email.test(value);
      setIsValidEmail(isValid ? true : false);
    } else if (name === "nickname") {
      setInputValueToSignUpInfo("nickname", value);
      const isValid = validOption.nick.test(value);
      setIsValidNickname(isValid ? true : false);
    } else if (name === "pw") {
      setInputValueToSignUpInfo("password", value);
      const isValid = validOption.pw.test(value);
      setIsValidPw(isValid ? true : false);
    } else {
      setInputValueToSignUpInfo("passwordConfirmation", value);
      const isValid = signUpInfo.password === value;
      setIsPwMatch(isValid ? true : false);
    }
  };

  const handlePwShow = (e: MouseEvent) => {
    const { id } = e.target as HTMLImageElement;
    id === "confirm"
      ? setIsPwShow((prevIsPwShow) => ({
          ...prevIsPwShow,
          passwordConfirmation: !prevIsPwShow.passwordConfirmation,
        }))
      : setIsPwShow((prevIsPwShow) => ({
          ...prevIsPwShow,
          password: !prevIsPwShow.password,
        }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signUp(signUpInfo);
      if (res) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        router.push("/");
      }
    } catch (e) {
      console.error(`Error : ${e}`);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className={styles["sign-up-container"]}>
      <div className={styles["sign-up-container__logo"]}>
        <Link href="/">
          <Image
            src="/images/Sign/panda-market-logo.png"
            alt="판다마켓 로고 겸 메인 페이지 이동 버튼"
            fill
            style={{ objectFit: "cover" }}
          />
        </Link>
      </div>

      <form action="#" method="post" className={styles["sign-up-from"]} onSubmit={handleSubmit}>
        <div className={styles["con"]}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            onChange={checkInputValidity}
            className={styles[isValidEmail ? "sign-email-input" : "sign-email-input-wrong"]}
            autoFocus
          />
          {isValidEmail || (
            <span className={styles["wrong-email"]}>
              {signUpInfo.email === "" ? "이메일을 입력해주세요" : "잘못된 이메일 형식입니다"}
            </span>
          )}
        </div>

        <div className={styles["con"]}>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            className={styles[isValidNickname ? "sign-nick-input" : "sign-nick-input-wrong"]}
            onChange={checkInputValidity}
          />
          {isValidNickname || (
            <span className={styles["wrong-nick"]}>{signUpInfo.nickname === "" && "닉네임을 입력해주세요"}</span>
          )}
        </div>

        <div className={styles.con}>
          <label htmlFor="pw">비밀번호</label>
          <input
            type={isPwShow.password ? "text" : "password"}
            id="pw"
            name="pw"
            placeholder="비밀번호를 입력해주세요"
            className={styles[isValidPw ? "sign-pw-input" : "sign-pw-input-wrong"]}
            onChange={checkInputValidity}
          />
          {isPwShow.password ? (
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
              {signUpInfo.password === "" ? "비밀번호를 입력해주세요" : "비밀번호를 8자 이상 입력해주세요"}
            </span>
          )}
        </div>

        <div className={styles.con}>
          <label htmlFor="re-pw">비밀번호 확인</label>
          <input
            type={isPwShow.passwordConfirmation ? "text" : "password"}
            id="re-pw"
            name="re-pw"
            placeholder="비밀번호를 다시 한번 입력해주세요"
            className={styles[isPwMatch ? "sign-repw-input" : "sign-repw-input-wrong"]}
            onChange={checkInputValidity}
          />
          {isPwShow.passwordConfirmation ? (
            <Image
              src="/images/Sign/show-icon.svg"
              alt="비밀번호 보이기 버튼"
              width={24}
              id="confirm"
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
              id="confirm"
              className={styles["none-show-icon"]}
              onClick={handlePwShow}
            ></Image>
          )}
          {isPwMatch || <span className={styles["wrong-repw"]}>비밀번호가 일치하지 않습니다</span>}
        </div>

        <button type="submit" disabled={isSignUpBtnDisabled} className={styles["signup-btn"]}>
          회원가입
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
        <div className={styles["go-signin-container"]}>
          <p>이미 회원이신가요?</p>
          <Link href="/SignIn">로그인</Link>
        </div>
      </form>
    </div>
  );
};

SignUp.noLayout = true;
export default SignUp;
