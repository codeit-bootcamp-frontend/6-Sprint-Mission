"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { getAccessToken } from "./api/authTokens";
import { useEffect } from "react";

export default function Home() {
  //처음 메인 페이지 들어오면 토큰 발급
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessToken = await getAccessToken();
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때 한 번만 실행

  return <div>main</div>;
}
