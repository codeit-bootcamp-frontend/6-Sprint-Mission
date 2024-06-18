"use client";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUp } from "../api/auth";
import { ISignUpUser } from "@/@types";
import styles from "@/styles/auth.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<ISignUpUser>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const watchedPassword = watch("password");
  const router = useRouter();

  const togglePasswordVisibility = (type: string) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "passwordConfirmation") {
      setShowPasswordConfirmation(!showPasswordConfirmation);
    }
  };

  const onSubmit: SubmitHandler<ISignUpUser> = async (data) => {
    const successSignUp = await signUp(data);
    if (successSignUp.success) {
      alert(successSignUp.message);
      await router.push(`/signIn`);
    } else {
      alert(successSignUp.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Image
        src="/images/logo.png"
        width={396}
        height={132}
        alt="판다마켓 로고"
        className={styles.authLogo}
      />
      <form action="" className="defaultForm" onSubmit={handleSubmit(onSubmit)}>
        <label>
          이메일
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "잘못된 이메일 형식입니다.",
              },
            })}
            className={errors.email ? "errInput" : ""}
          />
          {errors.email && <p className="errText">잘못된 이메일 형식입니다.</p>}
        </label>
        <label>
          닉네임
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            {...register("nickname", { required: true })}
            className={errors.nickname ? "errInput" : ""}
          />
          {errors.nickname && (
            <p className="errText">닉네임을 입력해 주세요.</p>
          )}
        </label>
        <div className="pwdLabel">
          <label>
            비밀번호
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력해주세요",
                },
                required: true,
              })}
              className={errors.password ? "errInput" : ""}
            />
            {errors.password && (
              <p className="errText">{errors.password.message}</p>
            )}
            <Image
              src={
                showPassword
                  ? "/images/ic_visibility_on.png"
                  : "/images/ic_visibility_off.png"
              }
              width={24}
              height={24}
              alt="비밀번호 확인"
              className="pwdToggleIcon"
              onClick={() => togglePasswordVisibility("password")}
            />
          </label>
        </div>
        <div className="pwdLabel">
          <label>
            비밀번호 확인
            <input
              type={showPasswordConfirmation ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              {...register("passwordConfirmation", {
                validate: (value) =>
                  value === watchedPassword || "비밀번호가 일치하지 않습니다.",
                required: true,
              })}
              className={errors.passwordConfirmation ? "errInput" : ""}
            />
            {errors.passwordConfirmation && (
              <p className="errText">{errors.passwordConfirmation.message}</p>
            )}
            <Image
              src={
                showPasswordConfirmation
                  ? "/images/ic_visibility_on.png"
                  : "/images/ic_visibility_off.png"
              }
              width={24}
              height={24}
              alt="비밀번호 확인"
              className="pwdToggleIcon"
              onClick={() => togglePasswordVisibility("passwordConfirmation")}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className={`primaryBtn ${styles.submitBtn}`}
        >
          회원가입
        </button>
      </form>
      <div className={styles.auth_sns}>
        <p>간편 로그인하기</p>
        <div className={styles.sns_area}>
          <Link href="https://www.google.com/" target="_blank">
            <Image
              src="/images/ic_google.png"
              alt="구글 로그인 아이콘"
              width={42}
              height={42}
            />
          </Link>
          <Link href="https://www.kakaocorp.com/page" target="_blank">
            <Image
              src="/images/ic_kakao.png"
              alt="카카오톡 로그인 아이콘"
              width={42}
              height={42}
            />
          </Link>
        </div>
      </div>
      <div className={styles.auth_btm}>
        <span>이미 회원이신가요?</span>
        <Link href="/signIn">로그인</Link>
      </div>
    </div>
  );
}
