import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "components/Input";
import Button from "components/Button";
import mainLogo from "assets/icon/main_logo.svg";
import kakaoIcon from "assets/icon/ic_kakao.svg";
import googleIcon from "assets/icon/ic_google.svg";
import { loginRequest, signupRequest } from "api/auth";
import { userInfoAtom } from "contexts/atom/user";
import { useSetAtom } from "jotai";
import * as S from "./index.style";

export function AuthLogo() {
  return (
    <Link to="/">
      <S.LogoBox>
        <S.AuthLogo src={mainLogo} alt="main-logo" />
      </S.LogoBox>
    </Link>
  );
}

const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [valid, setValid] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();
  const setUserInfo = useSetAtom(userInfoAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") setUser((prev) => ({ ...prev, email: value }));
    if (name === "password") setUser((prev) => ({ ...prev, password: value }));
  };

  const handleSubmit = async () => {
    if (!valid.email || !valid.password) return;
    const res = await loginRequest(user);

    if (res) {
      setUserInfo(res.data.user);
      navigate("/");
    }
  };

  const handleFormEnter = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return;

    handleSubmit();
  };

  useEffect(() => {
    if (EMAIL_REGEXP.test(user.email)) {
      setValid((prev) => ({ ...prev, email: true }));
    } else {
      setValid((prev) => ({ ...prev, email: false }));
    }

    if (user.password.length >= 8) {
      setValid((prev) => ({ ...prev, password: true }));
    } else {
      setValid((prev) => ({ ...prev, password: false }));
    }
  }, [user.email, user.password]);

  return (
    <S.AuthForm onKeyUp={handleFormEnter}>
      <div className="input-block">
        <h1 className="label">이메일</h1>
        <Input.Form.Email
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요"
          error={!valid.email && !!user.email}
        />
        {!valid.email && user.email && (
          <span className="error-msg">잘못된 이메일입니다</span>
        )}
      </div>

      <div className="input-block">
        <h1 className="label">비밀번호</h1>
        <Input.Form.PW
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요"
          error={!valid.password && !!user.password}
        />
        {!valid.password && user.password && (
          <span className="error-msg">비밀번호를 8자 이상 입력해주세요</span>
        )}
      </div>

      <div className="submit-btn-box">
        <Button.Submit
          isActive={valid.email && valid.password}
          round={true}
          handleSubmit={handleSubmit}
        >
          로그인
        </Button.Submit>
      </div>
    </S.AuthForm>
  );
}

export function SignupForm() {
  const [info, setInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    pwConfirm: "",
  });

  const [valid, setValid] = useState({
    email: false,
    nickname: false,
    password: false,
    pwConfirm: false,
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") setInfo((prev) => ({ ...prev, email: value }));
    if (name === "nickname") setInfo((prev) => ({ ...prev, nickname: value }));
    if (name === "password") setInfo((prev) => ({ ...prev, password: value }));
    if (name === "pw-confirm") {
      setInfo((prev) => ({ ...prev, pwConfirm: value }));
    }
  };

  const handleSubmit = async () => {
    if (Object.values(valid).some((v) => !v)) return;
    const res = await signupRequest(info);

    if (res) navigate("/login");
  };

  const handleFormEnter = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return;

    handleSubmit();
  };

  useEffect(() => {
    if (EMAIL_REGEXP.test(info.email)) {
      setValid((prev) => ({ ...prev, email: true }));
    } else {
      setValid((prev) => ({ ...prev, email: false }));
    }

    if (info.nickname) setValid((prev) => ({ ...prev, nickname: true }));
    else setValid((prev) => ({ ...prev, nickname: false }));

    if (info.password.length >= 8) {
      setValid((prev) => ({ ...prev, password: true }));
    } else {
      setValid((prev) => ({ ...prev, password: false }));
    }

    if (info.password === info.pwConfirm) {
      setValid((prev) => ({ ...prev, pwConfirm: true }));
    } else {
      setValid((prev) => ({ ...prev, pwConfirm: false }));
    }
  }, [info.email, info.password, info.nickname, info.pwConfirm]);

  return (
    <S.AuthForm onKeyUp={handleFormEnter}>
      <div className="input-block">
        <h1 className="label">이메일</h1>
        <Input.Form.Email
          name="email"
          value={info.email}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요"
          error={!valid.email && !!info.email}
        />
        {!valid.email && info.email && (
          <span className="error-msg">잘못된 이메일입니다</span>
        )}
      </div>

      <div className="input-block">
        <h1 className="label">닉네임</h1>
        <Input.Form
          name="nickname"
          value={info.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요"
        />
      </div>

      <div className="input-block">
        <h1 className="label">비밀번호</h1>
        <Input.Form.PW
          name="password"
          value={info.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요"
          error={!valid.password && !!info.password}
        />
        {!valid.password && info.password && (
          <span className="error-msg">비밀번호를 8자 이상 입력해주세요</span>
        )}
      </div>

      <div className="input-block">
        <h1 className="label">비밀번호 확인</h1>
        <Input.Form.PW
          name="pw-confirm"
          value={info.pwConfirm}
          onChange={handleChange}
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          error={!valid.pwConfirm && !!info.pwConfirm}
        />
        {!valid.pwConfirm && info.pwConfirm && (
          <span className="error-msg">비밀번호가 일치하지 않습니다</span>
        )}
      </div>

      <div className="submit-btn-box">
        <Button.Submit
          isActive={
            valid.email && valid.nickname && valid.password && valid.pwConfirm
          }
          round={true}
          handleSubmit={handleSubmit}
        >
          회원가입
        </Button.Submit>
      </div>
    </S.AuthForm>
  );
}

export function EasyLogin() {
  return (
    <S.EasyLogin>
      <span>간편 로그인하기</span>
      <Link
        to="https://www.google.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={googleIcon} alt="google-icon" />
      </Link>
      <Link
        to="https://www.kakaocorp.com/page/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={kakaoIcon} alt="kakao-icon" />
      </Link>
    </S.EasyLogin>
  );
}

export function LinkBlock({ type }: { type: "login" | "signup" }) {
  return (
    <S.LinkBlock>
      {type === "login" ? (
        <>
          <span>판다마켓이 처음이신가요? </span>
          <Link to="/signup">회원가입</Link>
        </>
      ) : (
        <>
          <span>이미 회원이신가요? </span>
          <Link to="/login">로그인</Link>
        </>
      )}
    </S.LinkBlock>
  );
}
