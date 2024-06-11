import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { LoginIcon } from "@/shared/ui/withLoginComponent";
import { useContext } from "react";
import { LoginContext } from "@/pages/_app";

const rokafSans = localFont({ src: "./ROKAF Sans Bold.ttf" });

export function Header() {
  const theme = useContext(LoginContext);
  return (
    <header className="border-b-[1px] border-b-gray px-4 md:px-6">
      <section className="mx-auto flex h-[70px] max-w-[1520px] items-center justify-between">
        <section className="flex items-center gap-4 md:gap-5 lg:gap-8">
          <div className="relative flex h-[70px] w-[81px] items-center object-cover text-blue md:w-[153px]">
            <Link
              href="/"
              className={`flex items-center gap-2 text-xl font-bold md:text-2xl ${rokafSans.className}`}
            >
              <Image
                src="/icons/pandaIcon.png"
                alt="pandaLogo"
                width={40}
                height={40}
                className="hidden md:inline"
              />
              판다마켓
            </Link>
          </div>
          <nav className="flex gap-2 text-base font-bold md:gap-0 md:text-lg">
            <Link
              href="/boards"
              className="text-blue no-underline md:px-[15px]"
            >
              자유게시판
            </Link>
            <Link href="/market" className="no-underline md:px-[15px]">
              중고마켓
            </Link>
          </nav>
        </section>
        <section>
          <LoginIcon loginRequired={!theme?.isLogin} />
        </section>
      </section>
    </header>
  );
}
