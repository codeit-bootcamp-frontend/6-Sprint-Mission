import "@/styles/globals.css";
import Header from "./Header";
import Footer from "./Footer";
import type { AppProps } from "next/app";

type CustomAppProps = AppProps & {
  Component: AppProps["Component"] & { noLayout?: boolean };
};

export default function App({ Component, pageProps }: CustomAppProps) {
  const useLayout = !Component.noLayout;

  if (!useLayout) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
