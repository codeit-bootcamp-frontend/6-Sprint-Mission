import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import SignUpFormInterface from "@/src/interfaces/SignUpForm.interface";
import axios from "@/src/lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../SignInUpForm.module.scss";
import Button from "@/src/components/Button/Button";
import logoIcon from "@/public/svgs/logo.svg";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormInterface>({
    mode: "onChange", // 입력 값이 변경될 때마다 유효성 검사를 수행
  });

  // 토큰이 있으면 홈으로 리디렉션
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      toast.success("이미 로그인된 상태입니다.");
      router.push("/");
    }
  }, [router]);

  const onSubmit: SubmitHandler<SignUpFormInterface> = async (data) => {
    try {
      await axios.post("/auth/signUp", data);
      toast.success("회원가입이 완료되었습니다.");
      router.push("/auth/signin"); // 회원가입 성공하면 자동으로 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
    }
  };

  const password = watch("password", "");

  return (
    <>
      <Link href="/">
        <Image src={logoIcon} alt="판다마켓 로고" width={396} height={132} />
      </Link>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "이메일을 입력해주세요." })}
              placeholder="이메일을 입력해주세요"
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              {...register("nickname", { required: "닉네임을 입력해주세요." })}
              placeholder="닉네임을 입력해주세요"
            />
            {errors.nickname && (
              <p className={styles.errorMessage}>{errors.nickname.message}</p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "최소 8글자를 입력해주세요.",
                },
              })}
              placeholder="비밀번호를 입력해주세요"
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="passwordConfirmation">비밀번호 확인</label>
            <input
              id="passwordConfirmation"
              type="password"
              {...register("passwordConfirmation", {
                required: "비밀번호 확인을 입력해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
            {errors.passwordConfirmation && (
              <p className={styles.errorMessage}>
                {errors.passwordConfirmation.message}
              </p>
            )}
          </div>
          <Button
            disabled={!isValid}
            fullWidth={true}
            height={56}
            radius={40}
            fontSize={20}
          >
            회원 가입
          </Button>
        </form>

        <div className={styles.goSignUp}>
          이미 회원이신가요?{" "}
          <Link href="/auth/signin">
            <span>로그인</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
