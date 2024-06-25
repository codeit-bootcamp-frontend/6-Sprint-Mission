import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import LinkButton from "./button/LinkButton";
import pandaLogo from "@/public/icons/panda_face.svg";
import { PropsWithChildren } from "react";

interface LinkType {
  href: string;
  activePaths?: string[];
}

/**
 * 커스텀 링크 함수 (링크 active 체크)
 * @param activePaths 활성화되어야하는 경로 배열
 * @returns Link 태그 반환
 */
const CustomLink = ({
  href,
  activePaths,
  children,
}: PropsWithChildren<LinkType>) => {
  const router = useRouter();
  const isActive = activePaths?.includes(router.pathname);

  return (
    <Link
      href={href}
      className={`font-bold text-lg ${
        isActive ? "text-blue" : "text-gray-600"
      } `}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  return (
    <header className="flex sticky top-0 py-[15px] pl-6 pr-[34px] bg-white border-b border-b-[#dfdfdf] z-10">
      <div className="w-full flex justify-between items-center flex-wrap max-w-[1520px] mx-auto">
        <div className="flex justify-center items-center">
          <Link href="/" className="flex justify-center items-center gap-2">
            <div className="hidden w-10 h-10 sm:block">
              <Image src={pandaLogo} alt="판다마켓 로고 이미지" />
            </div>
            <span className="font-ROKAFSans text-blue text-[26px] font-bold leading-[1.4] text-left">
              판다마켓
            </span>
          </Link>
          <ul className="flex justify-center items-center ml-4 sm:ml-5 md:ml-8 gap-2">
            <li className="md:min-w-[110px] text-center">
              <CustomLink href="/boards" activePaths={["/boards"]}>
                자유게시판
              </CustomLink>
            </li>
            <li className="md:min-w-[110px] text-center">
              <CustomLink href="/items">중고마켓</CustomLink>
            </li>
          </ul>
        </div>

        <LinkButton href={"/signin"}>로그인</LinkButton>
      </div>
    </header>
  );
};

export default Header;
