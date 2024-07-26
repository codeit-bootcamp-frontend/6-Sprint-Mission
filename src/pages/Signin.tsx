/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import iconOn from "../assets/icon_visibility_on.png";
import iconOff from "../assets/icon_visibility_off.png";
import iconGoogle from "../assets/icon_google.png";
import iconKakao from "../assets/icon_kakao.png";
import { ErrorMessage } from "@hookform/error-message";
import { EIGHT_NUMBERS_REGEX, EMAIL_REGEX } from "../utils/regex"
import { Link, useNavigate } from "react-router-dom"
import instance from "../lib/axios"

type FormData = {
  email: string;
  password: string;
};

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [isVisibilityIcon, setIsVisibilityIcon] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await instance.post("/auth/signIn", {
        email: data.email,
        password: data.password,
      });

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      alert("로그인 완료!");
      navigate("/");
    } catch (error) {
      console.log("데이터 전송 실패", error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsVisibilityIcon(!isVisibilityIcon);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-40">
      <Link to="/">
        <div className="h-[66] w-[198px] md:h-[132px] md:w-[396px]">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <div className="w-full px-4 md:px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center lg:px-40"
        >
          <div className="relative my-4 flex w-full flex-col justify-center gap-2 lg:w-auto">
            <label htmlFor="email" className="text-lg font-bold text-gray-700">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "잘못된 이메일 형식입니다.",
                },
              })}
              className={`w-full rounded-xl bg-coolgray-100 p-4 text-base text-gray-400 focus:outline-main lg:w-[512px] ${
                errors.email ? "border-2 border-error" : "border-none"
              }`}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="ml-4 text-xs text-error">{message}</p>
              )}
            />
          </div>
          <div className="relative my-4 flex w-full flex-col justify-center gap-2 lg:w-auto">
            <label
              htmlFor="password"
              className="text-lg font-bold text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type={isVisibilityIcon ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: EIGHT_NUMBERS_REGEX,
                  message: "비밀번호를 8자 이상 입력해주세요.",
                },
              })}
              className={`w-full rounded-xl bg-coolgray-100 p-4 text-base text-gray-400 focus:outline-main lg:w-[512px] ${
                errors.password ? "border-2 border-error" : "border-none"
              }`}
            />
            <img
              src={isVisibilityIcon ? iconOn : iconOff}
              alt="password icon"
              className="absolute right-[1rem] top-[3.2rem] h-6 w-6 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className="ml-4 text-xs text-error">{message}</p>
              )}
            />
          </div>
          <button
            type="submit"
            className={`w-full cursor-pointer rounded-[5rem] bg-btn-4 px-5 py-3 text-white lg:w-[512px] ${
              isValid && "bg-main"
            }`}
            disabled={!isValid}
          >
            로그인
          </button>
        </form>
      </div>
      <div className="w-full px-4 lg:w-[512px]">
        <div className="my-4 flex flex-row items-center justify-between rounded-xl bg-loginbg p-4">
          <p className="text-black">간편 로그인하기</p>
          <div className="flex flex-row gap-4">
            <a href="https://www.google.com/">
              <img src={iconGoogle} alt="google" className="h-10 w-10" />
            </a>
            <a href="https://www.kakaocorp.com/page/">
              <img src={iconKakao} alt="kakao" className="h-10 w-10" />
            </a>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p>판다마켓이 처음이신가요?</p>
          <Link to="/signup" className="text-main underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
