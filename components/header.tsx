import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "@/styles/Header.module.css";
import MainLogo from "@/public/icon/main_logo.svg";
import SmallMainLogo from "@/public/icon/main_logo_small.svg";
import user_icon from "@/public/icon/user_icon.svg";

const NavBar: React.FC = () => {
  const router = useRouter();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const profileImg =
    typeof window !== "undefined" ? localStorage.getItem("profileImg") : "null";

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
          href="/boards"
          className={router.pathname.startsWith("/boards") ? styles.focus : ""}
        >
          <span>자유게시판</span>
        </Link>
        <Link
          href="/items"
          className={router.pathname === "/items" ? styles.focus : ""}
        >
          <span>중고마켓</span>
        </Link>
      </div>

      {accessToken === null ? (
        <Link href="/signin">
          <span>로그인</span>
        </Link>
      ) : (
        <Link href="/mypage">
          <Image
            width={40}
            height={40}
            alt="user-icon"
            src={profileImg === "null" ? user_icon : profileImg}
            className={styles.userImg}
          />
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
