import { AuthProvider } from "@/src/contexts/AuthProvider";
import type { AppProps } from "next/app";
import "src/styles/style.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
