import { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import {
  AuthContainer,
  LogoHomeLink,
  Form,
  AuthSwitch,
  SubmitButton,
} from "./AuthStyles";
import InputItem from "../../components/UI/InputItem";
import logo from "../../assets/images/logo/logo.svg";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import { SignupInputId, getErrorMessage } from "./authUtils";
import PasswordInput from "./components/PasswordInput";
import useDebounce from "../../hooks/useDebounce";

interface FormState {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface ErrorState {
  email?: string;
  nickname?: string;
  password?: string;
  passwordConfirmation?: string;
}

const SignupPage: React.FC = () => {
  // 상태 관리를 위해 하나의 object로 묶어주었어요.
  const [formState, setFormState] = useState<FormState>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});

  // 비밀번호와 비밀번호 확인 필드는 입력값이 바뀔 때마다 validation 및 오류 메세지를 노출하기 때문에 onChange 함수가 일정 시간 후에 호출되도록 debouncing해줬어요.
  // useDebounce는 자주 사용하는 것이기 때문에 별도의 커스텀 훅으로 만들었어요.
  const debouncedPassword = useDebounce(formState.password, 500);
  const debouncedPasswordConfirmation = useDebounce(
    formState.passwordConfirmation,
    500
  );

  // 비밀번호와 비밀번호 확인 필드의 상태 업데이트를 함께 업데이트
  useEffect(() => {
    if (debouncedPassword || debouncedPasswordConfirmation) {
      const passwordError = getErrorMessage("password", debouncedPassword);
      const passwordConfirmationError = getErrorMessage(
        "passwordConfirmation",
        debouncedPasswordConfirmation,
        debouncedPassword
      );

      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
        passwordConfirmation: passwordConfirmationError,
      }));
    }
  }, [debouncedPassword, debouncedPasswordConfirmation]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const errorMessage = getErrorMessage(
      id as SignupInputId,
      value,
      formState.password
    );
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 안전 장치로 form 제출 전 validation 한 번 더 진행
    const newErrors = {
      email: getErrorMessage("email", formState.email),
      nickname: getErrorMessage("nickname", formState.nickname),
      password: getErrorMessage("password", formState.password),
      passwordConfirmation: getErrorMessage(
        "passwordConfirmation",
        formState.passwordConfirmation,
        formState.password
      ),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {
      // TODO: 회원가입 API
    }
  };

  return (
    <AuthContainer>
      <LogoHomeLink href="/" aria-label="홈으로 이동">
        <img src={logo} alt="판다마켓 로고" />
      </LogoHomeLink>

      <Form id="signupForm" method="post" onSubmit={handleSubmit}>
        <InputItem
          id="email"
          label="이메일"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이메일을 입력해 주세요"
          errorMessage={errors.email}
        />

        <InputItem
          id="nickname"
          label="닉네임"
          value={formState.nickname}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="닉네임을 입력해 주세요"
          errorMessage={errors.nickname}
        />

        <PasswordInput
          id="password"
          label="비밀번호"
          value={formState.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 입력해 주세요"
          errorMessage={errors.password}
        />

        <PasswordInput
          id="passwordConfirmation"
          label="비밀번호 확인"
          value={formState.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          errorMessage={errors.passwordConfirmation}
        />

        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>

      <SocialLogin />

      <AuthSwitch>
        이미 회원이신가요? <Link to="/login">로그인</Link>
      </AuthSwitch>
    </AuthContainer>
  );
};

export default SignupPage;
