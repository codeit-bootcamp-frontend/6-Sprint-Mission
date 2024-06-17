import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiClient from "../../lib/axios";
import kakao from "../../assets/images/social/kakao-logo.png";
import google from "../../assets/images/social/google-logo.png";
import logo from "../../assets/images/logo/logo.svg";
import "../../styles/auth.css";
import "../../styles/global.css";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await apiClient.post("auth/signIn", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/");
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  return (
    <div className="body">
      <main className="auth-container">
        <a href="/" className="logo-home-link" aria-label="홈으로 이동">
          <img src={logo} alt="판다마켓 로고" />
        </a>

        <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-item">
            <label htmlFor="email" className="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해 주세요."
              {...register("email", {
                required: "이메일을 입력해 주세요.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="input-item">
            <label htmlFor="password" className="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호 길이를 8자리 이상 입력해주세요.",
                },
              })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="button pill-button full-width">
            로그인
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
          판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
