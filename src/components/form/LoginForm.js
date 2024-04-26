import React from "react";
import styled from "styled-components";
import GoogleLogo from "../../assets/images/google.png";
import KakaoLogo from "../../assets/images/kakao.png";
import { loginSchema } from "../../utils/validation/Schema";
import { LoginUser } from "../../Api/loginUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginForm = () => {
  const resolver = yupResolver(loginSchema);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver,
    mode: "onChange",
  });

  const handleLogin = handleSubmit(async (data) => {
    try {
      const response = await LoginUser(data);
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      console.log("로그인 성공");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  });

  return (
    <>
      <form onSubmit={handleLogin}>
        <InputContainer>
          <Label htmlFor="email">이메일</Label>
          <Input
            className="email-input"
            placeholder="이메일을 입력해주세요"
            type="email"
            {...register("email")}
          />
          <ErrorText>{errors.email?.message}</ErrorText>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password">비밀번호</Label>
          <div className="input-wrapper">
            <Input
              className="password-input"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              {...register("password")}
            />
            <ErrorText>{errors.password?.message}</ErrorText>
          </div>
        </InputContainer>
        <LoginButton type="submit" disabled={!isValid}>
          로그인
        </LoginButton>
      </form>
      <SocialLoginContainer>
        <LogText id="log">간편 로그인하기</LogText>
        <SocialLogin>
          <a
            className="kakao-login"
            href="https://www.kakaocorp.com/page/"
            alt="kakaotalk"
          >
            <img className="kakao" src={KakaoLogo} alt="카카오톡 로고" />
          </a>
          <a
            className="google-login"
            href="https://www.google.com"
            alt="google"
          >
            <img className="google" src={GoogleLogo} alt="구글 로고" />
          </a>
        </SocialLogin>
      </SocialLoginContainer>
    </>
  );
};

const InputContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 700;
`;

const Input = styled.input`
  padding: 16px 24px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;

  &::placeholder {
    color: #9ca3af;
    font-size: 16px;
    line-height: 24px;
  }

  &:focus {
    outline-color: #3692ff;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 56px;
  border: 1px;
  border-radius: 40px;
  background: ${({ disabled }) => (disabled ? "#9ca3af" : "#3692ff")};
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
  margin-top: 15px;
  cursor: pointer;
`;

const SocialLoginContainer = styled.div`
  background-color: #e6f2ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 23px;
  margin: 24px 0;
`;

const LogText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 16px;
`;

const ErrorText = styled.div`
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  padding-top: 5px;
  padding-left: 15px;
  color: red;
`;

export default LoginForm;
