import Header from "./Header";
import React, { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1200px] sm:px-[16px] md:px-[24px]">
      <Header />
      <h1>레이아웃</h1>
      {children}
    </div>
  );
};

export default Layout;
