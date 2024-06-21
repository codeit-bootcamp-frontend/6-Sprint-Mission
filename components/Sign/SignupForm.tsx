import React, { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

export default function SignupForm() {
  // 이메일, 닉네임, 비밀번호, 비밀번호 확인 상태 관리
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const router = useRouter();

  // 각 입력 필드 상태를 업데이트하는 함수들
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };

  // 회원가입 요청을 보내는 함수
  const postSignUp = async () => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("auth/signUp", {
        email: email,
        nickname: nickname,
        password: password,
        passwordConfirmation: passwordConfirm,
      });

      alert("회원가입 성공");
      router.push("/signin");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패하셨습니다.");
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postSignUp();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="nickname">닉네임:</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={handleNicknameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인:</label>
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          required
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
}
