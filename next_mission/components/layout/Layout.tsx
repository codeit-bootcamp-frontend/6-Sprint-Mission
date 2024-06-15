import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Header from './Header';

// Todo : isAuthPage 로그인 css

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isAuthPage =
    router.pathname === '/login' || router.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Header />}
      <main className={isAuthPage ? '' : ''}>{children}</main>
    </>
  );
};

export default Layout;
