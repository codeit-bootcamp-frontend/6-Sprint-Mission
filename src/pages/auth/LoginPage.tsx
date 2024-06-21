import { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import {
  AuthContainer,
  LogoHomeLink,
  Form,
  AuthSwitch,
  SubmitButton,
} from "./AuthStyles";
import logo from "../../assets/images/logo/logo.svg";
import { Link } from "react-router-dom";
import InputItem from "../../components/UI/InputItem";
import SocialLogin from "./components/SocialLogin";
import { LoginInputId, getErrorMessage } from "./authUtils";
import PasswordInput from "./components/PasswordInput";
import useDebounce from "../../hooks/useDebounce";

interface FormState {
  email: string;
  password: string;
}

interface ErrorState {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});

  const debouncedPassword = useDebounce(formState.password, 500);

  useEffect(() => {
    if (debouncedPassword) {
      const passwordError = getErrorMessage("password", debouncedPassword);

      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
      }));
    }
  }, [debouncedPassword]);

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
    const errorMessage = getErrorMessage(id as LoginInputId, value);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 안전 장치로 form 제출 전 validation 한 번 더 진행
    const newErrors = {
      email: getErrorMessage("email", formState.email),
      password: getErrorMessage("password", formState.password),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {
      // TODO: 로그인 API
    }
  };

  return (
    <AuthContainer>
      <LogoHomeLink href="/" aria-label="홈으로 이동">
        <img src={logo} alt="판다마켓 로고" />
      </LogoHomeLink>

      <Form id="loginForm" method="post" onSubmit={handleSubmit}>
        <InputItem
          id="email"
          label="이메일"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이메일을 입력해 주세요"
          errorMessage={errors.email}
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

        <SubmitButton type="submit">로그인</SubmitButton>
      </Form>

      <SocialLogin />

      <AuthSwitch>
        판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
      </AuthSwitch>
    </AuthContainer>
  );
};

export default LoginPage;
