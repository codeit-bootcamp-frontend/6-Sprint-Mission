import Layout from "@/components/layout/Layout";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

// 리액트 프로젝트 index.tsx에서와 마찬가지로 App 컴포넌트에 styled-components의 ThemeProvider와 GlobalStyle을 적용해 주세요.

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
