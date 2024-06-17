import Header from "@/components/Header/Header";
import type { AppProps } from "next/app";
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="site-container">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
