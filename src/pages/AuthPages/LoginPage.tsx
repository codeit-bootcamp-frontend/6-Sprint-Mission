import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import Logo from "@/assets/images/logo/logo.svg";
import ShowIcon from "@/assets/images/icons/eye-invisible.svg"
import HideIcon from "@/assets/images/icons/eye-visible.svg";
import { Controller, useForm } from "react-hook-form";

function LoginPage() {
  const {
    control,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = (data: Object) => {
    console.log(JSON.stringify(data));
  }

  return (
    <div className="auth-container">
      <Link to="/" className="logo-home-link" aria-label="홈으로 이동">
        <img
          src={Logo}
          alt="판다마켓 로고"
        />
      </Link>

      <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "잘못된 이메일 형식입니다."
            }
          }}
          render = {({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <div className="input-item">
                <label htmlFor="email">이메일</label>
                <input
                  id="email"
                  name="email"
                  placeholder="이메일을 입력해주세요"
                  value={value}
                  onChange={onChange}
                />

                { error && 
                  <span className="error-message">
                    {error?.message}
                  </span>
                }
              </div>
            );
          }}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 8,
              message: '비밀번호를 8자 이상 입력해주세요'
            }
          }}
          render = {({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <div className="input-item">
                <label htmlFor="password">비밀번호</label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="비밀번호를 입력해 주세요"
                    value={value}
                    onChange={onChange}
                  />
                  <button
                    type="button"
                    className="password-toggle-button"
                    aria-label={`비밀번호 ${isPasswordVisible ? "보이기" : "가리기"}`}
                    onClick={()=>setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <img
                      className="password-toggle-icon"
                      src={ isPasswordVisible ? HideIcon : ShowIcon }
                      alt={`비밀번호 ${isPasswordVisible ? "표시" : "숨김"} 상태 아이콘`}
                    />
                  </button>
                </div>
                { error && 
                  <span className="error-message">
                    {error?.message}
                  </span>
                }
              </div>
            );
          }}
        />

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
            ><img
              src="images/social/google-logo.png"
              alt="구글 로그인"
              width="42"
          /></a>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오톡 로그인"
            ><img
              src="images/social/kakao-logo.png"
              alt="카카오톡 로그인"
              width="42"
          /></a>
        </div>
      </div>

      <div className="auth-switch">
        판다마켓이 처음이신가요? <Link to='/signup'>회원가입</Link>
      </div>
    </div>
  );
}

export default LoginPage;
