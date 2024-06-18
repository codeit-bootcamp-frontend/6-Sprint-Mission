import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <Head>
        <title>판다마켓</title>
        <meta name='description' content='The best flea market in the world - Home' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      {pathname !== '/login' && pathname !== '/signup' && <Navigation />}
      <Component {...pageProps} />
      {pathname !== '/login' && pathname !== '/signup' && <Footer />}
    </>
  );
}
