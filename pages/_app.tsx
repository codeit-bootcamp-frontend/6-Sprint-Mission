import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "components/Header";
import { Layout } from "components/Layout";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";
import { ThemeProvider } from "styled-components";
// import "lib/axiosInterceptor";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <title>판다마켓</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Layout>
          <Component {...pageProps} />  
        </Layout>
      </ThemeProvider>
    </>
  );
}
