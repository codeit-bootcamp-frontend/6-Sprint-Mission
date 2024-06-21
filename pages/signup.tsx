import { useEffect, useState } from "react";
import Head from "next/head";
import SignupForm from "@/components/Sign/SignupForm";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>판다마켓-회원가입</title>
      </Head>
      <SignupForm />
    </>
  );
}
