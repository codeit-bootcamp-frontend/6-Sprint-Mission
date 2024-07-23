"use client";
import Image from "next/image";
import { ChangeEvent, useRef, ReactElement, ReactNode, useEffect, useState, FormEvent } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button/Button";
import LogoImg from "@/src/img/logo-big.png";
import IcoGoogle from "@/src/img/ic_google.svg";
import IcoKakao from "@/src/img/ic_kakao.svg";
import { join } from "@/src/api/api";
import { useRouter } from "next/router";
import { useAuth } from "@/src/contexts/AuthProvider";

export default function JoinPage() {
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean | null>(null);
  const [isNameInvalid, setIsNameInvalid] = useState<boolean | null>(true);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean | null>(null);
  const [isRePasswordInvalid, setIsRePasswordInvalid] = useState<boolean | null>(true);
  const [isPasswordNotSame, setIsPasswordNotSame] = useState<boolean | null>(null);
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const inputPW = useRef<HTMLInputElement>();
  const inputRePW = useRef<HTMLInputElement>();
  const router = useRouter();
  const { user } = useAuth(false);

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    switch (e.target.type) {
      case "text":
        if (e.target.value.length === 0) {
          setIsNameInvalid(true);
        } else {
          setIsNameInvalid(false);
        }
        break;
      case "password":
        if (inputPW.current!.value.length >= 8 && inputRePW.current!.value.length >= 8 && inputPW.current?.value !== inputRePW.current?.value) {
          setIsPasswordNotSame(true);
        } else {
          setIsPasswordNotSame(false);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    const result = await join(jsonObject);

    if (!result) return;
    else {
      router.push("/signin");
    }
  };

  useEffect(() => {
    if (isEmailInvalid !== null && isPasswordInvalid !== null && isPasswordInvalid !== null && isRePasswordInvalid !== null && isNameInvalid !== null && isPasswordNotSame !== null) {
      setIsFormInvalid(isEmailInvalid || isPasswordInvalid || isRePasswordInvalid || isNameInvalid || isPasswordNotSame);
    }
  }, [handleChange, isEmailInvalid, isNameInvalid, isPasswordInvalid, isPasswordNotSame, isRePasswordInvalid]);

  return (
    <div className="wrap wrap-form">
      <section className="section-form">
        <header className="section-form__header">
          <h1 className="blind">회원가입 페이지</h1>
          <a href="/" className="link-home">
            <Image width="396" height="132" src={LogoImg} alt="판다마켓 로고 이미지" className="img-home" />
            <span className="blind">홈 바로가기</span>
          </a>
        </header>
        <div className="section-form__content">
          <form onChange={handleChange} onSubmit={handleSubmit}>
            <fieldset className="section-form__form">
              <legend className="blind">회원가입 폼</legend>
              <div className="section-form__box">
                <label htmlFor="join-email" className="section-form__label">
                  이메일
                </label>
                <span className="section-form__input-box">
                  <Input.Email id="join-email" name="email" setIsInvalid={setIsEmailInvalid} />
                  {isEmailInvalid && <p className="alert">잘못된 이메일 형식입니다.</p>}
                </span>
              </div>
              <div className="section-form__box">
                <label htmlFor="join-name" className="section-form__label">
                  닉네임
                </label>
                <span className="section-form__input-box">
                  <Input.Text id="join-name" name="nickname" placeholder="닉네임을 입력해주세요" />
                </span>
              </div>
              <div className="section-form__box">
                <label htmlFor="join-pw" className="section-form__label">
                  비밀번호
                </label>
                <span className="section-form__input-box">
                  <Input.Password id="join-pw" name="password" inputRef={inputPW} setIsInvalid={setIsPasswordInvalid} />
                </span>
              </div>
              <div className="section-form__box">
                <label htmlFor="join-pw-re" className="section-form__label">
                  비밀번호 확인
                </label>
                <span className="section-form__input-box">
                  <Input.Password id="join-pw-re" name="passwordConfirmation" inputRef={inputRePW} setIsInvalid={setIsRePasswordInvalid} />
                  {isPasswordNotSame && <p className="alert">비밀번호가 일치하지 않습니다.</p>}
                </span>
              </div>
              <div className="section-form__box">
                <Button type="submit" id="submit-join" size="large" className="section-form__btn" disabled={isFormInvalid}>
                  회원가입
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
        <section className="section-other">
          <h2 className="section-other__tit">간편 로그인하기</h2>
          <ul className="section-other__content">
            <li className="section-other__list">
              <a href="https://www.google.com" className="link">
                <Image width="42" height="42" src={IcoGoogle} alt="구글 로그인 바로가기" />
              </a>
            </li>
            <li className="section-other__list">
              <a href="https://www.kakaocorp.com/page/" className="link">
                <Image width="42" height="42" src={IcoKakao} alt="카카오 로그인 바로가기" />
              </a>
            </li>
          </ul>
        </section>
        <section className="section-form__info">
          <p className="content">
            이미 회원이신가요?{" "}
            <a href="/signin" className="link">
              로그인
            </a>
          </p>
        </section>
      </section>
    </div>
  );
}
