import HeaderSign from "@/components/shared/Header/HeaderSign";
import SocialLogin from "@/components/shared/SocialLogin";
import { buttonRecipe } from "@/css/recipe/buttonRecipe.styled";
import { inputRecipe } from "@/css/recipe/inputRecipe.styled";
import {
  formBasicStyle,
  labelBasicStyle,
  labelInputContainer,
} from "@/css/common/sign.styled";
import { css } from "@/styled-system/css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthProvider";
import { UserAccount } from "@/types/auth";

function Signup() {
  const { createAccount } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<UserAccount>();

  const onSubmit = async (data: UserAccount) => {
    await createAccount(data);
  };

  const handleBlur = async (field: keyof UserAccount) => {
    await trigger(field);
  };

  return (
    <div
      className={css({
        px: "16px",
        pt: { base: "24px", md: "48px", xl: "60px" },
      })}
    >
      <HeaderSign />
      <form className={formBasicStyle} onSubmit={handleSubmit(onSubmit)}>
        <div className={labelInputContainer}>
          <label className={labelBasicStyle}>
            이메일
            <input
              {...register("email", {
                required: { value: true, message: "이메일을 입력해주세요" },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "잘못된 이메일 형식입니다",
                },
              })}
              placeholder="이메일을 입력해주세요"
              className={inputRecipe()}
              onBlur={() => handleBlur("email")}
            />
            {errors.email && (
              <p className={css({ color: "errorRed" })}>
                {errors.email.message}
              </p>
            )}
          </label>
        </div>
        <div className={labelInputContainer}>
          <label className={labelBasicStyle}>
            닉네임
            <input
              {...register("nickname", {
                required: { value: true, message: "닉네임을 입력해주세요" },
                minLength: {
                  value: 1,
                  message: "닉네임을 입력해주세요",
                },
              })}
              placeholder="닉네임을 입력해주세요"
              className={inputRecipe()}
              onBlur={() => handleBlur("nickname")}
            />
            {errors.nickname && (
              <p className={css({ color: "errorRed" })}>
                {errors.nickname.message}
              </p>
            )}
          </label>
        </div>
        <div className={labelInputContainer}>
          <label className={labelBasicStyle}>
            비밀번호
            <input
              {...register("password", {
                required: { value: true, message: "비밀번호를 입력해주세요" },
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력해주세요",
                },
              })}
              placeholder="비밀번호를 입력해주세요"
              type="password"
              className={inputRecipe()}
              onBlur={() => handleBlur("password")}
            />
            {errors.password && (
              <p className={css({ color: "errorRed" })}>
                {errors.password.message}
              </p>
            )}
          </label>
        </div>
        <div className={labelInputContainer}>
          <label className={labelBasicStyle}>
            비밀번호 확인
            <input
              {...register("passwordConfirmation", {
                required: {
                  value: true,
                  message: "비밀번호 확인을 입력해주세요",
                },
                validate: (value) =>
                  value === watch("password") || "비밀번호가 일치하지 않습니다",
              })}
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              className={inputRecipe()}
              onBlur={() => handleBlur("passwordConfirmation")}
            />
            {errors.passwordConfirmation && (
              <p className={css({ color: "errorRed" })}>
                {errors.passwordConfirmation.message}
              </p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className={buttonRecipe({ visual: "sign", active: isValid })}
        >
          회원가입
        </button>
        <SocialLogin />
        <p className={css({ fontWeight: "bold" })}>
          이미 회원이신가요?{" "}
          <Link
            href="/signin"
            className={css({ color: "blueBasic", textDecoration: "underline" })}
          >
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
