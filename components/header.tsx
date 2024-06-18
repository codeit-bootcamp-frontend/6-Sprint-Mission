"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isToken, setIsToken] = useState<string | null>();
  const [morePopup, setMorePopup] = useState(false);
  const pathname = usePathname();

  const handleMoreToggle = () => {
    setMorePopup(!morePopup);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userid");
    setIsToken(null);
    setMorePopup(false);
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsToken(token);
    }
  }, [pathname]);

  return (
    <div className={styles.header}>
      <div className="headerLeft">
        <Link href="/" className="logo">
          <Image
            src="/images/logo.png"
            alt="로고 이미지"
            width={153}
            height={50}
          />
        </Link>
        {isToken && (
          <div className="nav">
            <Link
              href="/board"
              className={pathname.indexOf("board") != -1 ? "active" : ""}
            >
              자유게시판
            </Link>
            <Link
              href="/product"
              className={pathname.indexOf("product") != -1 ? "active" : ""}
            >
              중고마켓
            </Link>
          </div>
        )}
      </div>
      {isToken ? (
        <div className={styles.hraderProfile}>
          <Image
            src="/images/ic_profile.png"
            alt="프로필 이미지"
            onClick={handleMoreToggle}
            width={40}
            height={40}
            className={styles.profile}
          />
          {morePopup && (
            <div className="morePopup">
              <Link href="/">마이페이지</Link>
              <button type="button" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/signIn" className="primaryBtn">
          로그인
        </Link>
      )}
    </div>
  );
}
