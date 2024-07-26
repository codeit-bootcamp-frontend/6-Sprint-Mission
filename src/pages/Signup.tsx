/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import iconOn from "../assets/icon_visibility_on.png";
import iconOff from "../assets/icon_visibility_off.png";
import iconGoogle from "../assets/icon_google.png";
import iconKakao from "../assets/icon_kakao.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate, Link } from "react-router-dom"
import instance from "../lib/axios"
import { EMAIL_REGEX, EIGHT_NUMBERS_REGEX } from "../utils/regex"

type FormData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [isVisibilityIcon, setIsVisibilityIcon] = useState<boolean>(false);
  const [isVisibilityIconConfirm, setIsVisibilityIconConfirm] =
    useState<boolean>(false);

  // 비밀번호 확인 필드에서 비밀번호 필드의 값을 가져오기 위해 watch 함수 사용
  const password = watch("password", "");

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await instance.post(
        "/auth/signUp",
        {
          email: data.email,
          nickname: data.email,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      alert("회원가입이 완료되었습니다!");
      navigate("/signin");
    } catch (error) {
      console.log("데이터 전송 실패", error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsVisibilityIcon(!isVisibilityIcon);
  };

  const togglepasswordConfirmationVisibility = () => {
    setIsVisibilityIconConfirm(!isVisibilityIconConfirm);
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
          noValidate
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
              htmlFor="nickname"
              className="text-lg font-bold text-gray-700"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              {...register("nickname")}
              className={`w-full rounded-xl bg-coolgray-100 p-4 text-base text-gray-400 focus:outline-main lg:w-[512px] ${
                errors.nickname ? "border-2 border-error" : "border-none"
              }`}
            />
            <ErrorMessage
              errors={errors}
              name="nickname"
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
              type={isVisibilityIcon ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              id="password"
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
              alt="password visibility off icon"
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
          <div className="relative my-4 flex w-full flex-col justify-center gap-2 lg:w-auto">
            <label
              htmlFor="passwordConfirmation"
              className="text-lg font-bold text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              type={isVisibilityIconConfirm ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              id="passwordConfirmation"
              {...register("passwordConfirmation", {
                required: "비밀번호를 다시 입력해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
              className={`w-full rounded-xl bg-coolgray-100 p-4 text-base text-gray-400 focus:outline-main lg:w-[512px] ${
                errors.passwordConfirmation
                  ? "border-2 border-error"
                  : "border-none"
              }`}
            />
            <img
              src={isVisibilityIconConfirm ? iconOn : iconOff}
              alt="password visibility off icon"
              className="absolute right-[1rem] top-[3.2rem] h-6 w-6 cursor-pointer"
              onClick={togglepasswordConfirmationVisibility}
            />
            <ErrorMessage
              errors={errors}
              name="passwordConfirmation"
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
            회원가입
          </button>
        </form>
      </div>
      <div className="w-full px-4 lg:w-[512px]">
        <div className="my-4 flex flex-row items-center justify-between rounded-xl bg-loginbg p-4">
          <p className="text-black">간편 로그인하기</p>
          <div className="flex flex-row gap-4">
            <Link to="https://www.google.com/">
              <img src={iconGoogle} alt="google" className="h-10 w-10" />
            </Link>
            <Link to="https://www.kakaocorp.com/page/">
              <img src={iconKakao} alt="kakao" className="h-10 w-10" />
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <p>이미 회원이신가요?</p>
          <Link to="/signin" className="text-main underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
