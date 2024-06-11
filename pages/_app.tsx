import { getCookie } from "@/shared/lib/login";
import "@/styles/globals.css";
import { Header } from "@/widgets/header";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
} from "react";

const myFont = localFont({ src: "../public/font/Pretendard-Regular.otf" });

type ContextType = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export const LoginContext = createContext<ContextType | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);
  useLayoutEffect(() => {
    if (!!getCookie("refreshToken")) {
      setIsLogin(true);
    }
  }, []);
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" type="image/x-icon" href="/icons/pandaIcon.png" />
      </Head>
      <LoginContext.Provider value={{ isLogin, setIsLogin }}>
        <div className={myFont.className}>
          <Header />
          <div className={`px-4 md:px-6 lg:flex lg:justify-center`}>
            <main className="lg:w-[1200px]">
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </LoginContext.Provider>
    </>
  );
}
