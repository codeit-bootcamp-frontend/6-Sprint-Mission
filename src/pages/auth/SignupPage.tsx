import { useEffect } from "react";
import {
  AuthContainer,
  LogoHomeLink,
  Form,
  AuthSwitch,
  SubmitButton,
} from "./AuthStyles";
import InputItem from "../../components/UI/InputItem";
import logo from "../../assets/images/logo/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import PasswordInput from "./components/PasswordInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormValues } from "../../types/authTypes";
import { requestSignup } from "../../api/authApi";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({ mode: "onBlur" });

  const password = watch("password");
  const passwordConfirmation = watch("passwordConfirmation");

  useEffect(() => {
    if (password && passwordConfirmation) {
      trigger("passwordConfirmation");
    }
  }, [password, passwordConfirmation, trigger]);

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    const trimmedData: SignupFormValues = {
      email: data.email.trim(),
      nickname: data.nickname?.trim(),
      password: data.password.trim(),
      passwordConfirmation: data.passwordConfirmation.trim(),
    };

    try {
      const result = await requestSignup(trimmedData);
      console.log(result);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <AuthContainer>
      <LogoHomeLink href="/" aria-label="홈으로 이동">
        <img src={logo} alt="판다마켓 로고" />
      </LogoHomeLink>

      <Form id="signupForm" method="post" onSubmit={handleSubmit(onSubmit)}>
        <InputItem
          id="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          register={register("email", {
            required: "이메일을 입력해 주세요",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "잘못된 이메일 형식입니다",
            },
          })}
          setValue={setValue}
          trigger={trigger}
          errorMessage={errors.email?.message}
        />

        <InputItem
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          register={register("nickname", {
            required: "닉네임을 입력해 주세요",
          })}
          setValue={setValue}
          trigger={trigger}
          errorMessage={errors.nickname?.message}
        />

        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          register={register("password", {
            required: "비밀번호를 입력해 주세요",
            minLength: {
              value: 8,
              message: "비밀번호를 8자 이상 입력해 주세요",
            },
          })}
          errorMessage={errors.password?.message}
        />

        <PasswordInput
          id="passwordConfirmation"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          register={register("passwordConfirmation", {
            required: "비밀번호를 다시 한 번 입력해 주세요",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다",
          })}
          errorMessage={errors.passwordConfirmation?.message}
        />

        <SubmitButton type="submit" disabled={!isValid}>
          회원가입
        </SubmitButton>
      </Form>

      <SocialLogin />

      <AuthSwitch>
        이미 회원이신가요? <Link to="/login">로그인</Link>
      </AuthSwitch>
    </AuthContainer>
  );
};

export default SignupPage;
