import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Mypage() {
    const router = useRouter();

  useEffect(() => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("profileImg");
    router.push('/signin');
  });
}
