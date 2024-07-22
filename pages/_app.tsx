import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      {pathname !== '/login' && pathname !== '/signup' && <Footer />}
    </>
  );
}
