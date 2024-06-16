import { useState, useEffect } from "react";
import styles from "@/styles/SignUp.module.css";
import Input from "@/components/Input";
import Link from "next/link";
import Image from "next/image";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function RegisterPage() {
  const [values, setValues] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errorEmail, setErrorEmail] = useState("");
  const [errorNickname, setErrorNickname] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleEmailBlur = () => {
    if (values.email === "") {
      setErrorEmail("이메일을 입력해주세요.");
      return;
    } else if (!validateEmail(values.email)) {
      setErrorEmail("잘못된 이메일 형식입니다.");
    } else {
      setErrorEmail("");
    }
  };

  const handleNicknameBlur = () => {
    if (values.nickname === "") {
      setErrorNickname("닉네임을 입력해주세요.");
      return;
    } else {
      setErrorNickname("");
    }
  };

  const handlePasswordBlur = () => {
    if (values.password === "") {
      setErrorPassword("비밀번호를 입력해주세요.");
      return;
    } else if (values.password.length < 8) {
      setErrorPassword("비밀번호를 8자 이상 입력해주세요");
    } else {
      setErrorPassword("");
    }
  };

  const handlePasswordConfirmBlur = () => {
    if (values.passwordConfirm === "") {
      setErrorPasswordConfirm("비밀번호를 입력해주세요.");
      return;
    } else if (values.passwordConfirm.length < 8) {
      setErrorPasswordConfirm("비밀번호를 8자 이상 입력해주세요");
    } else if (values.passwordConfirm !== values.password) {
      setErrorPasswordConfirm("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorPasswordConfirm("");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.password !== values.passwordRepeat) {
      toast("warn", "비밀번호가 일치하지 않습니다.");
      return;
    }
    const { nickname, email, password } = values;
  }

  return (
    <>
      <div className={styles.login_container}>
        <div className={styles.login_logo_wrap}>
          <div className={styles.login_logo}>
            <Image fill src="/logo_face.png" alt="판다마켓" />
          </div>
        </div>

        <form className={styles.signup_form}>
          <div className={styles.signup_input}>
            <label className={styles.label_style} htmlFor="email">
              이메일
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              onChange={handleChange}
              onBlur={handleEmailBlur}
            />
            <div id="errorEmail" className={styles.error_message}>
              {errorEmail}
            </div>
          </div>

          <div className={styles.signup_input}>
            <label className={styles.label_style} htmlFor="nickname">
              닉네임
            </label>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              onChange={handleChange}
              onBlur={handleNicknameBlur}
            />
            <div id="errorNickname" className={styles.error_message}>{errorNickname}</div>
          </div>

          <div className={styles.signup_input}>
            <label className={styles.label_style} htmlFor="password">
              비밀번호
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              onChange={handleChange}
              onBlur={handlePasswordBlur}
            />
            <div id="errorPassword" className={styles.error_message}>{errorPassword}</div>
          </div>

          <div className={styles.signup_input}>
            <label className={styles.label_style} htmlFor="passwordConfirm">
              비밀번호 확인
            </label>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해 주세요"
              onChange={handleChange}
              onBlur={handlePasswordConfirmBlur}
            />
            <div
              id="errorPasswordConfirm"
              className={styles.error_message}
            >{errorPasswordConfirm}</div>
          </div>

          <button className={styles.signup_btn} type="button">
            회원가입
          </button>
        </form>

        <div className={styles.social_login}>
          <h4>간편 로그인하기</h4>
          <div className={styles.social_link}>
            <Link href="https://www.google.com/">
              <div className={styles.social_img}>
                <Image
                  fill
                  src="/google-logo.png"
                  target="_blank"
                  alt="구글로그인"
                />
              </div>
            </Link>
            <Link href="https://www.kakaocorp.com/page/">
              <div className={styles.social_img}>
                <Image
                  fill
                  src="/kakao_logo.png"
                  target="_blank"
                  alt="카카오로그인"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.login_signup}>
          이미 회원이신가요?<Link href="/auth/signIn">로그인</Link>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
