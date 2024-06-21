import Head from "next/head";
import Link from "next/link";
import SigninForm from "@/components/Sign/SigninForm";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Signin() {
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
        <title>판다마켓-로그인</title>
      </Head>
      <SigninForm />
      <Link href="/signup">회원가입 하러 가기</Link>
    </>
  );
}
