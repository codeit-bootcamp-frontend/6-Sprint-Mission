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
import { ChangeEventHandler, useState } from "react";
import postSignup from "@/apis/auth/postSignup";

function Signup() {
  const [userData, setUserData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await postSignup(userData);
      console.log("Signup successful:", response);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div
      className={css({
        px: "16px",
        pt: { base: "24px", md: "48px", xl: "60px" },
      })}
    >
      <HeaderSign />
      <div className={formBasicStyle}>
        <div className={labelInputContainer}>
          <label className={labelBasicStyle}>이메일</label>
          <input
            name="email"
            type={userData.email}
            placeholder="이메일을 입력해주세요"
            className={inputRecipe()}
            onChange={onChangeInput}
          />
        </div>
        <div className={labelInputContainer}>
          <label className={labelBasicStyle}>닉네임</label>
          <input
            name="nickname"
            type={userData.nickname}
            placeholder="닉네임을 입력해주세요"
            className={inputRecipe()}
            onChange={onChangeInput}
          />
        </div>
        <div className={labelInputContainer}>
          <label className={labelBasicStyle}>비밀번호</label>
          <input
            name="password"
            type={userData.password}
            placeholder="비밀번호를 입력해주세요"
            className={inputRecipe()}
            onChange={onChangeInput}
          />
        </div>
        <div className={labelInputContainer}>
          <label className={labelBasicStyle}>비밀번호 확인</label>
          <input
            name="passwordConfirmation"
            type={userData.passwordConfirmation}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            className={inputRecipe()}
            onChange={onChangeInput}
          />
        </div>
        <button
          type="submit"
          className={buttonRecipe({ visual: "sign" })}
          onClick={handleSubmit}
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
      </div>
    </div>
  );
}

export default Signup;
