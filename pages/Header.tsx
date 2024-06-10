import React, { use, useEffect, useState } from "react";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = (): JSX.Element => {
  const router = useRouter();
  const path = router.pathname;
  const [isLogined, setIsLogined] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsLogined(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, []);

  return (
    <>
      <header className={styles.Header}>
        <div className={styles["Header-container"]}>
          <Link href="/">
            <Image
              className={styles["Header-long-img"]}
              src="/images/Header/logoWithIcon.png"
              alt="판다 아이콘이 포함된 로고"
              width={153}
              height={51}
              quality={100}
              priority={true}
            />
            <Image
              className={styles["Header-short-img"]}
              src="/images/Header/logoWithNone.png"
              alt="판다 아이콘이 포함되지 않은 모바일용 로고"
              width={81}
              height={27}
              quality={100}
            />
          </Link>
          <ul className={styles["Header-btns"]}>
            <Link href="/boards" className={styles[path.includes("/boards") ? "Header-btn-active" : "Header-btn"]}>
              <li>자유게시판</li>
            </Link>
            <Link href="/Items" className={styles[path.includes("/Items") ? "Header-btn-active" : "Header-btn"]}>
              <li>중고마켓</li>
            </Link>
          </ul>
        </div>
        {isLogined ? (
          <Image
            src="/images/Header/userProfile.png"
            alt="헤더 프로필 이미지"
            width={40}
            height={40}
            onClick={handleDropdownOpen}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <Link href="/SignIn" className={styles["Header-login-btn"]}>
            로그인
          </Link>
        )}
        {isDropdownOpen && (
          <div className={styles["header-dropdown"]}>
            <button className={styles["header-dropdown__logout"]} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
