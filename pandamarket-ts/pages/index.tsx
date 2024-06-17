import Layout from "@/components/UI/Layout";
import { useRouter } from "next/router";
import React from "react";

const Home = () => {
  const router = useRouter();
  return (
    <Layout>
      <h1>홈페이지 입니다</h1>
      <button className="bg-blue" onClick={() => router.push("/auth/signin")}>
        로그인
      </button>
    </Layout>
  );
};

export default Home;
