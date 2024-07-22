import type { Metadata } from "next";
import Header from "@/components/Layout/Header";
import Container from "@/components/Layout/Container";
import Footer from "@/components/Layout/Footer";
import ReactQueryProviders from "@/contexts/ReactQueryProvider";
import "./globals.css";
import RecoilRootProviders from "@/contexts/RecoilRootProviders";
import Wrappers from "@/contexts/Wrappers";

export const metadata: Metadata = {
  title: "판다마켓",
  description: "판다마켓입니다",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <RecoilRootProviders>
          <ReactQueryProviders>
            <Wrappers />
            <Header />
            <Container>{children}</Container>
            <Footer />
          </ReactQueryProviders>
        </RecoilRootProviders>
      </body>
    </html>
  );
}
