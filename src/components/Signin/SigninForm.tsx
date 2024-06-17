import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import eyeInvisible from "../../assets/icon/eye-invisible.svg";
import eyeVisible from "../../assets/icon/eye-visible.svg";
import { useAuth } from "../../context/AuthProvider";

const schema = yup.object({
  email: yup.string().email("올바른 이메일 형식이 아닙니다.").required("이메일을 입력하세요."),
  password: yup.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다.").required("비밀번호를 입력하세요."),
}).required();

type SigninFormValues = {
  email: string;
  password: string;
};

export default function SigninForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const onSubmit: SubmitHandler<SigninFormValues> = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      alert("로그인에 실패했습니다.");
    }
  };

  function togglePasswordVisibility(): void {
    setShowPassword(!showPassword);
  }

  return (
    <form id="signinForm" className="signin-form" onSubmit={handleSubmit(onSubmit)}>
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
          id="pwd-toggle"
          src={showPassword ? eyeVisible : eyeInvisible}
          className="pwd-toggle"
          alt="비밀번호 토글"
          onClick={togglePasswordVisibility}
        />
        {errors.password && (
          <span id="pwd-Error" className="Error-message">
            {errors.password.message}
          </span>
        )}
      </div>
      <button type="submit" className="signin-btn btn">로그인</button>
    </form>
  );
}
