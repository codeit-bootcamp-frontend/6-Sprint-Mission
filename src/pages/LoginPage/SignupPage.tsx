import React, { useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "../../lib/axios";
import kakao from "../../assets/images/social/kakao-logo.png";
import google from "../../assets/images/social/google-logo.png";
import logo from "../../assets/images/logo/logo.svg";
import "../../styles/auth.css";
import "../../styles/global.css";

interface FormValues {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = useRef<string | null>(null);
  password.current = watch("password");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<FormValues> = async ({
    email,
    nickname,
    password,
    passwordConfirmation,
  }) => {
    try {
      const response = await apiClient.post("auth/signUp", {
        email,
        nickname,
        password,
        passwordConfirmation,
      });

      localStorage.setItem("Signup successful!", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="body">
      <main className="auth-container">
        <a href="/" className="logo-home-link" aria-label="홈으로 이동">
          <img src={logo} alt="판다마켓 로고" />
        </a>

        <form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-item">
            <label className="email">이메일</label>
            <input
              id="email"
              placeholder="이메일을 입력해 주세요."
              {...register("email", {
                required: { value: true, message: "이메일을 입력해 주세요" },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "잘못된 이메일 형식입니다.",
                },
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="input-item">
            <label className="nickname">닉네임</label>
            <input
              id="nickname"
              placeholder="닉네임을 입력해 주세요."
              {...register("nickname", {
                required: { value: true, message: "닉네임을 입력해 주세요" },
              })}
            />
            {errors.nickname && (
              <p className="error-message">{errors.nickname.message}</p>
            )}
          </div>

          <div className="input-item">
            <label className="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              {...register("password", {
                required: { value: true, message: "비밀번호를 입력해 주세요" },
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력해주세요",
                },
              })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="input-item">
            <label className="passwordConfirmation">비밀번호 확인</label>
            <input
              id="passwordConfirmation"
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요."
              {...register("passwordConfirmation", {
                required: {
                  value: true,
                  message: "비밀번호를 다시 입력해 주세요",
                },
                validate: (value) =>
                  value === password.current || "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.passwordConfirmation && (
              <p className="error-message">
                {errors.passwordConfirmation.message}
              </p>
            )}
          </div>

          <button type="submit" className="button pill-button full-width">
            회원가입
          </button>
        </form>

        <div className="social-login-container">
          <h3>간편 로그인하기</h3>
          <div className="social-login-links-container">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="구글 로그인"
            >
              <img src={google} alt="구글 로그인" width="42" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="카카오톡 로그인"
            >
              <img src={kakao} alt="카카오톡 로그인" width="42" />
            </a>
          </div>
        </div>

        <div className="auth-switch">
          이미 회원이신가요? <a href="/login">로그인</a>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
