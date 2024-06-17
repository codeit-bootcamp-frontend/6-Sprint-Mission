import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noHeaderPaths = ["/signin", "/signup"];

  const showHeader = !noHeaderPaths.includes(router.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Component {...pageProps} />
    </>
  );
}
