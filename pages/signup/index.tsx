import { useState, useEffect } from "react";
import ic_kakao from "@/images/ic_kakao.png";
import ic_google from "@/images/ic_google.png";
import ic_hidden from "@/images/btn_visibility_off.svg";
import ic_visible from "@/images/btn_visibility_on.svg";
import logo from "@/images/login_logo.png";
import Link from "next/link";
import Image from "next/image";
import styles from "@/pages/signin/style.module.css";
import postSignup from "@/apis/postSignup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/schema";

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}

const Signup = () => {

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
  const [visiblePassWord, setVisiblePassWord] = useState<boolean>(false);
  const [visiblePassWordCheck, setVisiblePassWordCheck] =
    useState<boolean>(false);
  const eyeIconPassWord: string = visiblePassWord ? ic_visible : ic_hidden;
  const eyeIconPassWordCheck: string = visiblePassWordCheck
    ? ic_visible
    : ic_hidden;

  const handleVisiblePassWordBtn = () => {
    setVisiblePassWord((prev) => !prev);
  };
  const handleVisiblePassWordCheckBtn = () => {
    setVisiblePassWordCheck((prev) => !prev);
  };

  const handleSignUP = handleSubmit(async (data: FormValues) => {
    try {
      await postSignup(data);
      alert("회원가입에 성공했습니다.");
      router.push("/signin");
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
          <form className={styles.login_form} onSubmit={handleSignUP}>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userEmail">이메일</label>
                <input
                  id="userEmail"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  {...register("email")}
                />
              </div>
              <span className={styles.input_err_message}>
                {errors.email?.message}
              </span>
            </div>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userNickName">닉네임</label>
                <input
                  id="userNickName"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  {...register("nickname")}
                />
              </div>
              <span className={styles.input_err_message}>
                {errors.nickname?.message}
              </span>
            </div>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userPassword">비밀번호</label>
                <input
                  id="userPassword"
                  type={visiblePassWord ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  {...register("password")}
                />
                <Image
                  src={eyeIconPassWord}
                  className={styles.password_visible_btn}
                  alt="비밀번호 숨기기 버튼"
                  onClick={handleVisiblePassWordBtn}
                />
              </div>
              <span className={styles.input_err_message}>
                {errors.password?.message}
              </span>
            </div>
            <div className={styles.user_input}>
              <div className={styles.user_input_section}>
                <label htmlFor="userPasswordCheck">비밀번호 확인</label>
                <input
                  id="userPasswordCheck"
                  type={visiblePassWordCheck ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  {...register("passwordConfirmation")}
                />
                <Image
                  src={eyeIconPassWordCheck}
                  className={styles.password_visible_btn}
                  alt="비밀번호 숨기기 버튼"
                  onClick={handleVisiblePassWordCheckBtn}
                />
              </div>
              <span className={styles.input_err_message}>
                {errors.passwordConfirmation?.message}
              </span>
            </div>
            <button disabled={!isValid} type="submit">
              회원가입
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
            <span>이미 회원이신가요?</span>
            <Link href="/signin">로그인</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
