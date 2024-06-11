import { getToken } from "@/shared/api";
import { setCookie } from "@/shared/lib/login";
import { useContext } from "react";
import { LoginContext } from "./_app";

export default function LoginPage() {
  const theme = useContext(LoginContext);
  const handleClick = () => {
    (async () => {
      const token = await getToken();
      setCookie("accessToken", token.accessToken, { "max-age": 3600 });
      setCookie("refreshToken", token.refreshToken);
      theme?.setIsLogin(true);
    })();
  };
  return <button onClick={handleClick}>로그인 완성</button>;
}
