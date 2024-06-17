import React, { useEffect, useState } from "react";
import ic_kakao from "@/images/ic_kakao.png";
import ic_google from "@/images/ic_google.png";
import ic_hidden from "@/images/btn_visibility_off.svg";
import ic_visible from "@/images/btn_visibility_on.svg";
import logo from "@/images/login_logo.png";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.css";
import postSignin from "@/apis/postSignin";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}

const Signin = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const eyeIcon = visible ? ic_visible : ic_hidden;
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormValues>({mode: "onChange",});


  const handleVisibleBtn = () => {
    setVisible((prev) => !prev);
  };

  const handleSignIn = handleSubmit(async (data: FormValues) => {
    try {
      const result = await postSignin(data);
      const { accessToken, refreshToken } = result;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      alert("로그인 성공");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      alert("이미 로그인 상태입니다.");
      router.push("/");
    }
  }, []);

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
          <form className={styles.login_form} onSubmit={handleSignIn}>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userEmail">이메일</label>
                <input
                  id="userEmail"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  {...register("email", {
                    required: { value: true, message: "이메일을 입력해주세요" },
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "이메일 형식이 올바르지 않습니다",
                    },
                  })}
                />
              </div>
              <span className={styles.input_err_message}>
                {errors.email?.message}
              </span>
            </div>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userPassword">비밀번호</label>
                <input
                  id="userPassword"
                  type={visible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "비밀번호를 입력해주세요",
                    },
                    minLength: {
                      value: 8,
                      message: "비밀번호 길이를 8자리 이상 입력해주세요",
                    },
                  })}
                />
                <Image
                  src={eyeIcon}
                  className={styles.password_visible_btn}
                  alt="비밀번호 숨기기 버튼"
                  onClick={handleVisibleBtn}
                />
              </div>
              <span className={styles.input_err_message}>
                {errors.password?.message}
              </span>
            </div>
            <button disabled={!isValid} type="submit">
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
