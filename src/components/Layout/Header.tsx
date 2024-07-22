"use client";

import Link from "next/link";
import Image from "next/image";
import NavLink from "@/components/NavLink";
import Button from "@/components/Button/Button";
import BaseDropdown from "@/components/Dropdown/BaseDropdown";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { logout } from "@/lib/api/auth";
import { userAtom } from "@/recoil/atoms/UserAtom";

interface GNBNavLinkProps {
  href: string;
  children: React.ReactNode;
}

const GNBLinkStyles = {
  activeStyle: "text-blue",
  inactiveStyle: "text-cool-gray-600",
  baseStyle: "font-bold text-16 md:w-109 md:text-18 md:text-center",
};

const GNBNavLink = ({ href, children }: GNBNavLinkProps) => {
  return (
    <NavLink
      href={href}
      activeClassName={GNBLinkStyles.activeStyle}
      inactiveClassName={GNBLinkStyles.inactiveStyle}
      className={GNBLinkStyles.baseStyle}
    >
      {children}
    </NavLink>
  );
};

function Header() {
  const { user } = useRecoilValue(userAtom);

  const setUserAtom = useSetRecoilState(userAtom);

  return (
    <nav className="fixed top-0 z-20 flex h-70 w-full items-center gap-8 border-b border-gray-200 bg-white px-16 md:px-24 xl:px-200">
      <Link href="/">
        <div className="hidden md:block lg:mr-20">
          <Image
            src="/images/img_panda-logo.svg"
            alt="판다마켓"
            width={150}
            height={41}
            priority={true}
          />
        </div>
      </Link>
      <div className="mr-8 md:hidden">
        <Image
          src="/images/img_panda-logo-typo.svg"
          alt="판다마켓"
          width={81}
          height={40}
          priority={true}
        />
      </div>
      <GNBNavLink href="/boards">자유게시판</GNBNavLink>
      <GNBNavLink href="/items">중고마켓</GNBNavLink>
      {user.id ? (
        <div className="flexcenter ml-auto gap-16">
          <BaseDropdown
            buttonContent={
              <Image
                src={user.image || "/images/img_default-profile.svg"}
                width={40}
                height={40}
                alt="profile-image"
              />
            }
          >
            <div className="w-88 translate-y-12 rounded-8 border-1 bg-white text-center">
              <Button.Link href="/me" className=" h-40 w-full border-b-1 ">
                마이페이지
              </Button.Link>
              <Button
                onClick={() => logout(setUserAtom)}
                className="h-40 w-full"
              >
                로그아웃
              </Button>
            </div>
          </BaseDropdown>
        </div>
      ) : (
        <Button.Link
          href="/login"
          className="ct--primary-button ml-auto h-42 w-88"
        >
          로그인
        </Button.Link>
      )}
    </nav>
  );
}

export default Header;
