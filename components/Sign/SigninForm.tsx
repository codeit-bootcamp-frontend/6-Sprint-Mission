import React, { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

export default function SigninForm() {
  // email과 password 상태 관리
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  // email 상태를 업데이트하는 함수
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // password 상태를 업데이트하는 함수
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 로그인 요청을 보내는 함수
  const postSignIn = async () => {
    try {
      const res = await axios.post("auth/signIn", {
        email: email,
        password: password,
      });
      const accessToken = res.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      alert("로그인 되셨습니다!");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("로그인에 실패하셨습니다.");
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postSignIn();
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
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
}
