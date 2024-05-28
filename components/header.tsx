import React from "react";
import MainLogo from "@/public/icon/main_logo.svg";
import SmallMainLogo from "@/public/icon/main_logo_small.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import LinkButton from "@/utils/Button";
import styles from "@/styles/Header.module.css";
import user_icon from "@/public/icon/user_icon.svg";

const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.navvar}>
      <Link href="/">
        <Image
          width={153}
          height={51}
          className={styles.mainlogo}
          src={MainLogo}
          alt="로고"
        />
        <Image
          width={81}
          height={27}
          className={styles.mainlogo}
          src={SmallMainLogo}
          alt="로고"
        />
      </Link>
      <div className={styles.menus}>
        <Link
          href="/board"
          className={router.pathname === "/board" ? styles.focus : ""}
        >
          <span>자유게시판</span>
        </Link>
        <Link
          href="/items"
          className={
            router.pathname.startsWith("/items") ||
            router.pathname === "/additem"
              ? styles.focus
              : ""
          }
        >
          <span>중고마켓</span>
        </Link>
      </div>
      <LinkButton href="/mypage">
        <Image width={40} height={40} alt="user-icon" src={user_icon} />
      </LinkButton>
    </nav>
  );
};

export default NavBar;
