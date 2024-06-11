import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navigation from '@/components/navigation';
import Head from 'next/head';
import Footer from '@/components/footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <meta name='description' content='The best flea market in the world - Home' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
