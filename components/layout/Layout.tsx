import React, { ReactNode } from "react";
import Header from "./Header";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Header />}
      <main className={isAuthPage ? "" : "withHeader"}>{children}</main>
    </>
  );
};

export default Layout;
