import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';

import Layout from '@/components/Layout';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--global-font',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={pretendard.className}>
      <Layout>
        <Head>
          <title>판다마켓</title>
          <meta name="description" content="일상의 모든 물건을 거래해보세요" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
