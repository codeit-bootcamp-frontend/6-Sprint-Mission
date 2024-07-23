"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import LogoImg from "@/src/img/logo-big.png";
import IcoGoogle from "@/src/img/ic_google.svg";
import IcoKakao from "@/src/img/ic_kakao.svg";
import Link from "next/link";
import { useAuth } from "@/src/contexts/AuthProvider";
import { useRouter } from "next/router";

export default function SignInPage() {
  const { user, login } = useAuth(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(true);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonObject : Record<string, any> = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    await login(jsonObject);
    router.push("/");
  }

  return (
    <div className="wrap wrap-form">
      <section className="section-form">
        <header className="section-form__header">
          <h1 className="blind">로그인 페이지</h1>
          <a href="/" className="link-home">
            <Image width="396" height="132" src={LogoImg} alt="판다마켓 로고 이미지" className="img-home" />
            <span className="blind">홈 바로가기</span>
          </a>
        </header>
        <div className="section-form__content">
          <form action="/items.html" onSubmit={handleSubmit}>
            <fieldset className="section-form__form">
              <legend className="blind">로그인 폼</legend>
              <div className="section-form__box">
                <label htmlFor="login-email" className="section-form__label">
                  이메일
                </label>
                <span className="section-form__input-box">
                  <Input.Email
                    id="login-email"
                    className="section-form__input"
                    name="email"
                    onChange={handleInputChange}
                    placeholder="이메일을 입력해주세요"
                    required={true}
                    setIsInvalid={setIsEmailInvalid}
                  />
                </span>
              </div>
              <div className="section-form__box">
                <label htmlFor="login-pw" className="section-form__label">
                  비밀번호
                </label>
                <span className="section-form__input-box">
                  <Input.Password id="login-pw" name="password" onChange={handleInputChange} setIsInvalid={setIsPasswordInvalid} />
                </span>
              </div>
              <div className="section-form__box">
                <Button size="large" type="submit" id="btn-submit" className="section-form__btn btn-large" disabled={isEmailInvalid || isPasswordInvalid}>
                  로그인
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
        <section className="section-other">
          <h2 className="section-other__tit">간편 로그인하기</h2>
          <ul className="section-other__content">
            <li className="section-other__list">
              <Link href="https://www.google.com" className="link">
                <Image width="42" height="42" src={IcoGoogle} alt="구글 로그인 바로가기" />
              </Link>
            </li>
            <li className="section-other__list">
              <Link href="https://www.kakaocorp.com/page/" className="link">
                <Image width="42" height="42" src={IcoKakao} alt="카카오 로그인 바로가기" />
              </Link>
            </li>
          </ul>
        </section>
        <section className="section-form__info">
          <p className="content">
            판다마켓이 처음이신가요?{" "}
            <Link href="/join" className="link">
              회원가입
            </Link>
          </p>
        </section>
      </section>
    </div>
  );
}
