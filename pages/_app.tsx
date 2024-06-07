import Container from "@/components/Container";
import Header from "@/components/Header";
import ThemeProvider from "@/lib/ThemeContext";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Header />
      <Container page={true}>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
