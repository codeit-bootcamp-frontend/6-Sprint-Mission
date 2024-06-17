import { useEffect, useState } from "react";
import styles from "./AuthForm.module.scss";
import { LoginPasswordInput, LoginTextInput } from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { AuthResponseBody } from "@/interfaces/Auth.interface";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

interface LoginData {
  email: string;
  password: string;
}

function LoginForm() {
  const router = useRouter();

  const [hasAllInput, setHasAllInput] = useState(false);
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useForm<LoginData>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<LoginData> = (formData, event) => {
    const postData = async () => {
      try {
        const res: AxiosResponse<AuthResponseBody> = await axios.post(
          "/auth/signIn",
          formData
        );
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setErrorMessage("");
        router.replace("/");
      } catch (e) {
        if (e instanceof AxiosError) {
          const message = e.response?.data.hasOwnProperty("message")
            ? e.response?.data.message
            : e.message;
          setErrorMessage(message);
        }
      }
    };

    event?.preventDefault();
    postData();
  };

  useEffect(() => {
    // NOTE - 기존에 로그인 되어있는지 확인
    if (localStorage.getItem("accessToken")) {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    // NOTE - 값 유효성 검사에 따라 버튼 활성화 여부 결정
    const noError = Object.keys(errors).length === 0;
    const allFilled = Object.keys(dirtyFields).length === 2;
    setHasAllInput(noError && allFilled);
  }, [
    errors,
    dirtyFields,
    Object.keys(errors).length === 0,
    Object.keys(dirtyFields).length === 2,
  ]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <LoginTextInput
        id="email"
        error={errors?.email?.message}
        register={register}
      />
      <LoginPasswordInput
        id="password"
        error={errors?.password?.message}
        register={register}
      />
      <button className={styles.button} type="submit" disabled={!hasAllInput}>
        로그인
      </button>
      {errorMessage && <p className={styles.warning}>{errorMessage}</p>}
    </form>
  );
}

export default LoginForm;
