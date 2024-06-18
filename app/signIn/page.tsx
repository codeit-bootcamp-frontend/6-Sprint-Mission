"use client";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "../api/auth";
import { ISignUpUser } from "@/@types";
import styles from "@/styles/auth.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ISignUpUser>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (type: string) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    }
  };

  const isFormValid = Object.keys(errors).length === 0;
  const router = useRouter();

  const onSubmit: SubmitHandler<ISignUpUser> = async (data) => {
    const successSignIp = await signIn(data);
    if (successSignIp.success) {
      alert(successSignIp.message);
      await router.push(`/`);
    } else {
      alert(successSignIp.message);
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
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className={`primaryBtn ${styles.submitBtn}`}
        >
          로그인
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
        <span>판타마켓이 처음신가요?</span>
        <Link href="/signUp">회원가입</Link>
      </div>
    </div>
  );
}
