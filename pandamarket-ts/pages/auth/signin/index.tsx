import Layout from "@/components/UI/Layout";
import { postSignIn } from "@/pages/api/api";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
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
    router.push("/");
  }

  const onSubmit = async (data: IForm) => {
    try {
      const response = await postSignIn(data);
      localStorage.setItem("accessToken", response.accessToken);
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 서버에서 보내준 로그인이 실패 이유 표기
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
          <button className="my-[24px] h-[56px] w-full rounded-[40px] bg-gray-400 text-white">
            로그인
          </button>
          <div className="flex justify-center">
            <Link href="/auth/signup">회원가입</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
