"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";
import { AuthLogoHeader, SocialLogin } from "@/components/PageComponents/auth";
import useAuthForm, { LogInRequest } from "@/hooks/useAuthForm";
import { login } from "@/lib/api/auth";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/recoil/atoms/UserAtom";

const LogIn = () => {
  const setUserAtom = useSetRecoilState(userAtom);
  const router = useRouter();
  const { handleSubmit, emailRegister, passwordRegister, errors } =
    useAuthForm<LogInRequest>("onChange", {
      email: "",
      password: "",
    });

  const onSubmit = async (data: LogInRequest) => {
    try {
      await login(setUserAtom, data);
      router.replace("/");
    } catch (err: any) {
      console.log(err);
      // alert(err.response.data.message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-400 px-24 md:max-w-[640px]">
      <AuthLogoHeader />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormGroup.Label htmlFor="email">이메일</FormGroup.Label>
          <FormGroup.InputField
            label="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            className={`${Boolean(errors?.email?.message) ? "ct--input-error" : ""}`}
            {...emailRegister}
          />
          <FormGroup.ErrorMessage errorMsg={errors?.email?.message || null} />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="password">비밀번호</FormGroup.Label>
          <FormGroup.InputField.Password
            label="password"
            placeholder="비밀번호를 입력해주세요"
            className={`${Boolean(errors?.password?.message) ? "ct--input-error" : ""}`}
            {...passwordRegister}
          />
          <FormGroup.ErrorMessage
            errorMsg={errors?.password?.message || null}
          />
        </FormGroup>

        <Button
          className="mx-w-400 ct--primary-button mt-16 h-44 w-full rounded-36 md:max-w-[640px]"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          로그인
        </Button>
      </form>

      <SocialLogin />

      <div className="mb-160 mt-24 flex justify-center text-15 font-medium text-gray-800">
        <p>판다마켓이 처음이신가요?</p>
        <Link
          className="ml-8 bg-transparent text-blue underline"
          href="/signup"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
