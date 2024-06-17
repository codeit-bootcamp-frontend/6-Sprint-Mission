import Layout from "@/components/UI/Layout";
import { postSignUp } from "@/pages/api/api";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  if (typeof window !== "undefined" && localStorage.getItem("accessToken")) {
    return router.push("/");
  }

  const onSubmit = async (data: IForm) => {
    if (data.password !== data.passwordConfirmation) {
      setError(
        "passwordConfirmation",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true },
      );
      return;
    }
    try {
      await postSignUp(data);
      alert("회원가입이 완료되었습니다.");
      router.push("/auth/signin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 서버에서 보내준 회원 가입 실패 이유 표기
        alert(error.response?.data.message);
      }
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-[640px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>이메일</label>
            <input
              className="my-[24px] block h-[56px] w-full rounded-[12px] bg-gray-100"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
          </div>
          {errors.email && <p className="text-red">{errors.email?.message}</p>}
          <div>
            <label>닉네임</label>
            <input
              className="my-[24px] block h-[56px] w-full rounded-[12px] bg-gray-100"
              {...register("nickname", {
                required: "닉네임을 입력해주세요.",
                maxLength: { value: 8, message: "닉네임은 최대 8자 입니다." },
              })}
            />
          </div>
          {errors.nickname && (
            <p className="text-red">{errors.nickname?.message}</p>
          )}
          <div>
            <label>비밀번호</label>
            <input
              className="my-[24px] block h-[56px] w-full rounded-[12px] bg-gray-100"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상입니다.",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red">비밀번호를 8자 이상 입력해주세요</p>
          )}
          <div>
            <label>비밀번호 확인</label>
            <input
              className="my-[24px] block h-[56px] w-full rounded-[12px] bg-gray-100"
              {...register("passwordConfirmation", {
                required: "비밀번호를 다시 한 번 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상입니다.",
                },
              })}
            />
          </div>
          {errors.passwordConfirmation && (
            <p className="text-red">{errors.passwordConfirmation?.message}</p>
          )}
          <button className="my-[24px] h-[56px] w-full rounded-[40px] bg-gray-400 text-white">
            회원가입
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
