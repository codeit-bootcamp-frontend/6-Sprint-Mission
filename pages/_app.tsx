import Header from '@/components/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthProvider';

type TCustomAppProps = AppProps & {
  Component: AppProps['Component'] & { hideHeader?: boolean };
};

export default function App({ Component, pageProps }: TCustomAppProps) {
  return (
    <>
      <AuthProvider>
        {!Component.hideHeader && <Header />}
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
