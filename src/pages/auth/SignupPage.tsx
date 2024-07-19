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

  // 만약 회원가입 컴포넌트 마운트 시 localStorage에 accessToken가 존재한다면 이미 로그인 상태라는 의미이므로 홈페이지로 리라우팅
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  // 리액트 form 상태와 유효성 검사를 간편하게 관리할 수 있도록 도와주는 라이브러리인 react-hook-form을 설치하고 사용해 볼게요!

  const {
    register, // 각 입력 필드를 폼에 등록하고 유효성 검사 규칙을 설정하는 함수
    handleSubmit, // 폼 제출을 처리하는 함수
    watch, //  폼 필드의 변경을 감지하는 함수
    setValue, // 폼의 값을 설정하는 함수
    trigger, // 폼의 유효성 검사를 트리거하는 함수
    formState: { errors, isValid }, // 폼의 상태를 나타내는 객체
  } = useForm<SignupFormValues>({ mode: "onBlur" });

  // useForm 훅의 `mode` 옵션
  // - 기본 설정은 제출 함수가 실행되는 'onSubmit'이지만, `mode` 옵션을 별도로 넣어주면 유효성 검사가 언제 실행되는지를 설정할 수 있어요.
  // - onSubmit, onBlur, onChange, onTouched, all 등의 모드가 있는데, 사용자가 입력 중 실시간으로 피드백을 받을 수 있도록 onChange 또는 onBlur를 추천해요.

  // formState: form의 상태를 나타내는 객체
  // - formState.errors는 각 필드의 오류 메시지를 나타내는 상태예요.
  // - formState.isValid는 form에서 필수로 지정된 모든 필드의 입력값이 유효한지 여부를 나타내는 상태예요.
  //   (formState 객체에서 isValid 속성을 사용하려면, useForm 훅을 호출할 때 mode를 onChange, onBlur, onTouched 중 하나로 설정해야 해요.)

  // 실시간으로 입력값을 감지해야 하는 경우, 폼의 현재 상태를 가져오는 getValues보다 watch 함수를 사용하는 것이 더 적합해요.
  const password = watch("password");
  const passwordConfirmation = watch("passwordConfirmation");

  // 비밀번호가 변경될 때마다 비밀번호 확인 필드의 유효성을 검사
  useEffect(() => {
    if (password && passwordConfirmation) {
      trigger("passwordConfirmation");
    }
  }, [password, passwordConfirmation, trigger]);

  // 참고: handleSubmit은 react-hook-form 함수 이름과 겹치기 때문에 onSubmit으로 바꿔주었어요.
  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    // 제출할 데이터를 trim하여 공백 제거
    const trimmedData: SignupFormValues = {
      email: data.email.trim(),
      nickname: data.nickname?.trim(),
      password: data.password.trim(),
      passwordConfirmation: data.passwordConfirmation.trim(),
    };

    try {
      // 회원가입 API 호출
      const result = await requestSignup(trimmedData);
      console.log(result);
      // 회원가입 API 호출 후 응답 성공 시, 로그인 페이지로 이동
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

      {/* 
        React-hook-form 라이브러리에서 제공하는 handleSubmit 함수는 폼 데이터를 검증하고, 유효성 검사가 통과되면 지정된 콜백 함수(onSubmit)를 호출해요. 
        만약 유효성 검사에 실패하면 오류 상태를 업데이트하여 errors 객체에 오류 메시지를 설정하고, 해당 입력 필드에 오류 메시지를 표시해요. 
      */}
      <Form id="signupForm" method="post" onSubmit={handleSubmit(onSubmit)}>
        <InputItem
          id="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          register={register("email", {
            // required에 boolean 값을 넣어줄 수도 있지만, 대신 오류 메세지 문자열을 넣어놓으면 해당 필드를 필수 항목으로 설정함과 동시에 폼 제출 시 입력값이 없을 경우 해당 메시지가 표시돼요.
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
