import Image from "next/image";
import styles from "./AuthForm.module.scss";
import { UseFormRegister } from "react-hook-form";
import { INPUT_RULES, LABELS, PLACEHOLDER } from "@/constants/auth";
import {
  LoginData,
  LoginDataKey,
  SignupData,
  SignupDataKey,
} from "@/interfaces/Auth.interface";
import { useState } from "react";

export function SignupTextInput({
  id,
  error,
  register,
}: {
  id: SignupDataKey;
  error?: string;
  register: UseFormRegister<SignupData>;
}) {
  const type = id === "email" ? "email" : "text";
  const autoComplete = id === "email" ? "email" : "off";

  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {LABELS[id]}
      </label>
      <input
        {...register(id, INPUT_RULES[id])}
        className={styles.input}
        type={type}
        id={id}
        placeholder={PLACEHOLDER[id]}
        autoComplete={autoComplete}
      />
      {error && <p className={styles.warning}>{error}</p>}
    </div>
  );
}

export function LoginTextInput({
  id,
  error,
  register,
}: {
  id: LoginDataKey;
  error?: string;
  register: UseFormRegister<LoginData>;
}) {
  /* Q2.
   * SignupTextInput과 register(+id)의 타입만 다른데, 따로 정의했습니다.
   * 합칠 수 있는 방법이 있을까요?
   */
  const type = id === "email" ? "email" : "text";
  const autoComplete = id === "email" ? "email" : "off";

  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {LABELS[id]}
      </label>
      <input
        {...register(id, INPUT_RULES[id])}
        className={styles.input}
        type={type}
        id={id}
        placeholder={PLACEHOLDER[id]}
        autoComplete={autoComplete}
      />
      {error && <p className={styles.warning}>{error}</p>}
    </div>
  );
}

export function SignupPasswordInput({
  id,
  error,
  register,
}: {
  id: SignupDataKey;
  error?: string;
  register: UseFormRegister<SignupData>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleInvisibleClick = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {LABELS[id]}
      </label>
      <div className={styles.password_wrapper}>
        <input
          {...register(id, INPUT_RULES[id])}
          className={styles.input}
          type={isVisible ? "text" : "password"}
          id={id}
          placeholder={PLACEHOLDER[id]}
          autoComplete="current-password"
        />
        <button
          type="button"
          className={styles.on_off}
          onClick={handleInvisibleClick}
        >
          <Image
            alt="비밀번호 보기"
            src={isVisible ? "/icons/visible.svg" : "/icons/invisible.svg"}
            width={24}
            height={24}
          />
        </button>
      </div>
      {error && <p className={styles.warning}>{error}</p>}
    </div>
  );
}

export function LoginPasswordInput({
  id,
  error,
  register,
}: {
  id: LoginDataKey;
  error?: string;
  register: UseFormRegister<LoginData>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleInvisibleClick = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <div>
      <label className={styles.label} htmlFor={id}>
        {LABELS[id]}
      </label>
      <div className={styles.password_wrapper}>
        <input
          {...register(id, INPUT_RULES[id])}
          className={styles.input}
          type={isVisible ? "text" : "password"}
          id={id}
          placeholder={PLACEHOLDER[id]}
          autoComplete="current-password"
        />
        <button
          type="button"
          className={styles.on_off}
          onClick={handleInvisibleClick}
        >
          <Image
            alt="비밀번호 보기"
            src={isVisible ? "/icons/visible.svg" : "/icons/invisible.svg"}
            width={24}
            height={24}
          />
        </button>
      </div>
      {error && <p className={styles.warning}>{error}</p>}
    </div>
  );
}
