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
import { useAuth } from "@/context/AuthProvider";
import { useForm } from "react-hook-form";
import { UserData } from "@/types/auth";

function Signin() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<UserData>();

  const onSubmit = async (data: UserData) => {
    await login(data);
  };

  const handleBlur = async (field: keyof UserData) => {
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
                  message: "이메일 형식이 올바르지 않습니다",
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
            비밀번호
            <input
              {...register("password", {
                required: { value: true, message: "비밀번호를 입력해주세요" },
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력해주세요",
                },
              })}
              type="password"
              placeholder="비밀번호를 입력해주세요"
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
        <button
          type="submit"
          className={buttonRecipe({ visual: "sign", active: isValid })}
        >
          로그인
        </button>
        <SocialLogin />
        <p className={css({ fontWeight: "bold" })}>
          판다마켓이 처음이신가요?{" "}
          <Link
            href="./signup"
            className={css({ color: "blueBasic", textDecoration: "underline" })}
          >
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
