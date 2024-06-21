import React, { useLayoutEffect, useRef } from "react";
import { useRouter } from "next/router";

function withAuth<P extends Object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const hasAlerted = useRef(false);

    useLayoutEffect(() => {
      if (localStorage.getItem("accessToken")) {
        if (!hasAlerted.current) {
          alert("이미 로그인한 상태입니다.");
          router.push("/");
          hasAlerted.current = true;
        }
      }
    }, [router]);

    return <Component {...(props as P)} />;
  };
}

export default withAuth;
