import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { useAuth } from "@/src/contexts/AuthProvider";
import styles from "../SignInUpForm.module.scss";
import logoIcon from "@/public/svgs/logo.svg";
import Button from "@/src/components/Button/Button";

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormValues>({
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

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    try {
      await signIn(data);
    } catch (error) {
      console.error(error);
    }
  };

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
              {...register("email", { required: true })}
              placeholder="이메일을 입력해주세요"
            />
            {errors.email && (
              <span className={styles.errorMessage}>이메일을 입력하세요.</span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="비밀번호를 입력해주세요"
            />
            {errors.password && (
              <span className={styles.errorMessage}>
                비밀번호를 입력하세요.
              </span>
            )}
          </div>
          <Button
            disabled={!isValid}
            fullWidth={true}
            height={56}
            radius={40}
            fontSize={20}
          >
            로그인
          </Button>
        </form>

        <div className={styles.goSignUp}>
          판다마켓이 처음이신가요?{" "}
          <Link href="/auth/signup">
            <span>회원가입</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
