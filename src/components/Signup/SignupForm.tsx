import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import eyeInvisible from "../../assets/icon/eye-invisible.svg";
import eyeVisible from "../../assets/icon/eye-visible.svg";
import { postSignup } from "../API/API";
import { useAuth } from "../../context/AuthProvider";

const schema = yup.object({
  email: yup.string().email("올바른 이메일 형식이 아닙니다.").required("이메일을 입력하세요."),
  nickname: yup.string().required("닉네임을 입력하세요."),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .required("비밀번호를 입력하세요."),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력하세요."),
}).required();

type SignupFormValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignupForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      await postSignup(data);
      alert("회원가입이 완료되었습니다.");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
    }
  };

  function togglePasswordVisibility(): void {
    setShowPassword(!showPassword);
  }

  function togglePasswordConfirmVisibility(): void {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  return (
    <form id="signupForm" className="signin-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="signin-label">이메일</label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요."
          className="signin-input"
          {...register("email")}
          style={{ border: errors.email ? "1px solid #f74747" : "none" }}
        />
        {errors.email && (
          <span id="email-Error" className="Error-message">
            {errors.email.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="nickname" className="signin-label">닉네임</label>
        <input
          id="nickname"
          type="text"
          placeholder="닉네임을 입력해 주세요."
          className="signin-input"
          {...register("nickname")}
          style={{ border: errors.nickname ? "1px solid #f74747" : "none" }}
        />
        {errors.nickname && (
          <span id="nickname-Error" className="Error-message">
            {errors.nickname.message}
          </span>
        )}
      </div>
      <div className="signin-pwd">
        <label htmlFor="password" className="signin-label">비밀번호</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력해 주세요."
          className="signin-input"
          {...register("password")}
          style={{ border: errors.password ? "1px solid #f74747" : "none" }}
        />
        <img
          id="password-toggle"
          src={showPassword ? eyeVisible : eyeInvisible}
          className="pwd-toggle"
          alt="비밀번호 토글"
          onClick={togglePasswordVisibility}
        />
        {errors.password && (
          <span id="password-Error" className="Error-message">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="signin-pwd">
        <label htmlFor="passwordConfirmation" className="signin-label">비밀번호 확인</label>
        <input
          id="passwordConfirmation"
          type={showPasswordConfirm ? "text" : "password"}
          placeholder="비밀번호를 다시 한 번 입력해 주세요."
          className="signin-input"
          {...register("passwordConfirmation")}
          style={{ border: errors.passwordConfirmation ? "1px solid #f74747" : "none" }}
        />
        <img
          id="passwordConfirmation-toggle"
          src={showPasswordConfirm ? eyeVisible : eyeInvisible}
          className="pwd-toggle"
          alt="비밀번호 토글"
          onClick={togglePasswordConfirmVisibility}
        />
        {errors.passwordConfirmation && (
          <span id="passwordConfirmation-Error" className="Error-message">
            {errors.passwordConfirmation.message}
          </span>
        )}
      </div>
      <button type="submit" className="signin-btn btn">회원가입</button>
    </form>
  );
}
