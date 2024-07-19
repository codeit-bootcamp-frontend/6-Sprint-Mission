"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import GoogleLogo from "../../app/assets/images/google.png";
import KakaoLogo from "../../app/assets/images/kakao.png";
import loginUser from "../apis/loginUser";
import { loginSchema } from "../utils/validation/Schema";
import styles from "./LoginForm.module.css";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const resolver = yupResolver(loginSchema);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver,
    mode: "onChange",
  });

  const handleLogin = handleSubmit(async (data: FormValues) => {
    try {
      const response = await loginUser(data);
      if (response) {
        const { accessToken } = response;
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);
        }
        router.push("/items");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  });

  return (
    <>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            className={`${styles.input} ${errors.email ? styles.error : ""}`}
            placeholder="이메일을 입력해주세요"
            type="email"
            {...register("email")}
          />
          <div className={styles.errorText}>{errors.email?.message}</div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            className={`${styles.input} ${errors.password ? styles.error : ""}`}
            placeholder="비밀번호를 입력해주세요"
            type="password"
            {...register("password")}
          />
          <div className={styles.errorText}>{errors.password?.message}</div>
        </div>
        <button
          type="submit"
          className={`${styles.loginButton} ${!isValid ? styles.disabled : ""}`}
          disabled={!isValid}
        >
          로그인
        </button>
      </form>
      <div className={styles.socialLoginContainer}>
        <div className={styles.logText} id="log">
          간편 로그인하기
        </div>
        <div className={styles.socialLogin}>
          <a className="kakao-login" href="https://www.kakaocorp.com/page/">
            <Image className="kakao" src={KakaoLogo} alt="카카오톡 로고" />
          </a>
          <a className="google-login" href="https://www.google.com">
            <Image className="google" src={GoogleLogo} alt="구글 로고" />
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
