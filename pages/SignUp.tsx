import styles from "@/styles/SignUp.module.css";
import React, { useState, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { signUp } from "@/lib/apis/sign.api";
import { useRouter } from "next/router";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import withAuth from "@/components/hoc/withAuth";

interface IForm {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}

interface IsShow {
  isPwShow: boolean;
  isPwConfirmShow: boolean;
}

const SignUp = () => {
  const [showPwIcon, setshowPwIcon] = useState<IsShow>({
    isPwShow: false,
    isPwConfirmShow: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<IForm>({
    mode: "onChange",
  });

  const router = useRouter();

  const handlePwShow = (e: MouseEvent) => {
    const { id } = e.target as HTMLImageElement;
    console.log(id);
    if (id === "isPwShow" || id === "isPwConfirmShow") {
      setshowPwIcon((prevShowPwIcon) => ({
        ...prevShowPwIcon,
        [id]: !prevShowPwIcon[id],
      }));
    }
  };

  const handleSubmitForm: SubmitHandler<IForm> = async (data) => {
    try {
      const res = await signUp(data);
      if (res) {
        router.push("/SignIn");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
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

        <form action="#" method="post" className={styles["sign-up-from"]} onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={styles["con"]}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "잘못된 이메일 형식입니다",
                },
              })}
              className={styles[errors.email ? "sign-email-input-wrong" : "sign-email-input"]}
              autoFocus
            />
            {errors.email ? <span className={styles["wrong-email"]}>{errors.email.message}</span> : null}
          </div>

          <div className={styles["con"]}>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              {...register("nickname", {
                required: "닉네임을 입력해주세요",
              })}
              placeholder="닉네임을 입력해주세요"
              className={styles[errors.nickname ? "sign-nick-input-wrong" : "sign-nick-input"]}
            />
            {errors.nickname ? <span className={styles["wrong-nick"]}>{errors.nickname.message}</span> : null}
          </div>

          <div className={styles.con}>
            <label htmlFor="password">비밀번호</label>
            <input
              type={showPwIcon.isPwShow ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력해주세요",
                },
              })}
              placeholder="비밀번호를 입력해주세요"
              className={styles[errors.password ? "sign-pw-input-wrong" : "sign-pw-input"]}
            />
            {showPwIcon.isPwShow ? (
              <Image
                src="/images/Sign/show-icon.svg"
                id="password"
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
                id="password"
                width={24}
                height={24}
                className={styles["none-show-icon"]}
                onClick={handlePwShow}
              ></Image>
            )}
            {errors.password ? <span className={styles["wrong-pw"]}>{errors.password.message}</span> : null}
          </div>

          <div className={styles.con}>
            <label htmlFor="passwordConfirmation">비밀번호 확인</label>
            <input
              type={showPwIcon.isPwConfirmShow ? "text" : "password"}
              id="passwordConfirmation"
              placeholder="비밀번호를 다시 한번 입력해주세요"
              {...register("passwordConfirmation", {
                required: "비밀번호를 다시 입력해주세요",
                validate: (value) => value === watch("password") || "비밀번호가 일치하지 않습니다.",
              })}
              className={styles[errors.passwordConfirmation ? "sign-repw-input-wrong" : "sign-repw-input"]}
            />
            {showPwIcon.isPwConfirmShow ? (
              <Image
                src="/images/Sign/show-icon.svg"
                alt="비밀번호 보이기 버튼"
                width={24}
                id="passwordConfirmation"
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
                id="passwordConfirmation"
                className={styles["none-show-icon"]}
                onClick={handlePwShow}
              ></Image>
            )}
            {errors.passwordConfirmation ? (
              <span className={styles["wrong-repw"]}>{errors.passwordConfirmation.message}</span>
            ) : null}
          </div>

          <button type="submit" disabled={!isValid} className={styles["signup-btn"]}>
            회원가입
          </button>

          <div className={styles["social-login"]}>
            <p>간편 로그인하기</p>
            <div className={styles["social-login-logo"]}>
              <Link href="https://accounts.google.com/signin/v2/usernamerecovery?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount&hl=ko&theme=glif&ddm=0&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
                <Image
                  src="/images/Sign/google-logo.png"
                  alt="구글 로그인 이동하기 버튼"
                  width={42}
                  height={42}
                ></Image>
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
    </>
  );
};

const ProtectedSignUp = withAuth(SignUp);

(ProtectedSignUp as any).noLayout = true;

export default ProtectedSignUp;
