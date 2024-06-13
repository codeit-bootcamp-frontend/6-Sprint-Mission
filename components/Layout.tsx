import { useRouter } from 'next/router';

import Footer from './Footer';
import LogoHeader from './LogoHeader';
import MainHeader from './MainHeader';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { asPath } = useRouter();

  if (asPath === '/') {
    return (
      <>
        <MainHeader />
        <main className={`mt-[70px]`}>{children}</main>
        <Footer />
      </>
    );
  }

  if (asPath === '/signin' || asPath === '/signup') {
    return (
      <>
        <LogoHeader />
        <main className="m-auto px-4 pb-20 pt-6 tablet:px-12 tablet:pb-24 desktop:px-16 desktop:pb-16">
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <MainHeader />
      <main
        className={`m-auto mt-[70px] px-4 pb-24 pt-8 tablet:px-6 desktop:max-w-[1200px] desktop:px-0`}
      >
        {children}
      </main>
    </>
  );
}
