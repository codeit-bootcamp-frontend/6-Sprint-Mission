import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from 'axios';
import styles from "../styles/style_signup.module.css";

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            router.push('/');
        }
    },[router]);

    const handleSubmit = aync (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/auth/signUp',formData,{
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            router.push('/login');
          } else {
            setError(response.data.message || '회원가입 실패');
          }
        } catch (error) {
          if(error.response) {
            setError(error.response.data.message || '회원가입 실패');
          } else if (error.request) {
            setError('서버가 응답하지 않습니다. 나중에 다시 시도해 주세요.');
          } else {
            setError('요청 설정 중에 오류가 발생했습니다.');
          }
        }
    }
    const handleInputChange = (e) => {
      const {name,value} = e.target;
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  return (
    <div>
      <Head>
        <title>회원가입 판다마켓</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href={normalize} />
        <link rel="stylesheet" href={styles} />
      </Head>
      <div className={styles.header}>
        <img id="logo" src="Image/판다 얼굴@3x.png" />
        <a href="/">
          <div className={styles.name}>판다마켓</div>
        </a>
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.input}>
            <label htmlFor="email_input">이메일</label>
            <input
              type="text"
              id="email_input"
              name="email_input"
              placeholder="이메일을 입력해 주세요"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <p id="emailErrorMessage" className={styles.error_message}>
              잘못된 이메일 형식입니다
            </p>
          </div>
          <div className={styles.input}>
            <label htmlFor="nickname_input">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname_input"
              placeholder="닉네임을 입력해 주세요"
              value={nickname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="pw_input">비밀번호</label>
            <div className={styles.input_wrapper}>
              <input
                type="password"
                id="pw_input"
                className={styles.pw_input}
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <img
                src="Image/btn_visibility_off.png"
                alt="비밀번호 숨김"
                className={styles.toggle_password}
              />
            </div>
            <p id="passwordErrorMessage" className={styles.error_message}>
              비밀번호를 8자 이상 입력해주세요
            </p>
          </div>
          <div className={styles.input}>
            <label htmlFor="pw_input2">비밀번호 확인</label>
            <input
              type="password"
              id="pw_input2"
              name="pw_input_verify"
              placeholder="비밀번호를 다시 한 번 입력해 주세요"
              value={passwordVerify}
              onChange={(e) => setPasswordVerify(e.target.value)}
              required
            />
            <p id="passwordMismatchError" className={styles.error_message}>
              비밀번호가 일치하지 않습니다
            </p>
          </div>
          {error && <p className={styles.error_message}>{error}</p>}
          <button type="submit" className={styles.signupButton} disabled={signupButtonDisabled}>
            회원가입
          </button>
        </form>
        <div className={styles.easyloginbox}>
          <div className={styles.easylogin}>간편 로그인하기</div>
          <div className={styles.image}>
            <a href="https://www.google.com/">
              <img src="Image/google.png" />
            </a>
            <a href="https://www.kakaocorp.com/page/">
              <img src="Image/kakao.png" />
            </a>
          </div>
        </div>
        <div className={styles.auth_switch}>
          <span className={styles.p}>이미 회원이신가요?</span>
          <a href="/login">로그인</a>
        </div>
      </div>
    </div>
  );
}