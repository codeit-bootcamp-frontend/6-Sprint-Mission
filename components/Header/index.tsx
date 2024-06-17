import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import logo from "@/images/panda_market_home_logo.png";
import user_icon from "@/images/ic_user.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import RegisterButton from "../RegisterButton";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const accessToken = localStorage.getItem("accessToken");
    setLoggedIn(!!accessToken);
  };

  useEffect(() => {
    checkLoginStatus();
  }, [pathname]);
  
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <Link href="/" className={styles.logo}>
          <Image src={logo} alt="판다 마켓 로고" fill priority />
        </Link>
        <div className={styles.navLinks}>
          <Link
            href="/boards"
            className={`${styles.navLink} ${
              pathname.includes("/boards") ? styles.active : ""
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/items"
            className={`${styles.navLink} ${
              pathname === "/items" ? styles.active : ""
            }`}
          >
            중고마켓
          </Link>
        </div>
        <div className={styles.login}>
          {loggedIn ? (
            <div className={styles.user_icon}>
              <Image src={user_icon} fill alt="유저 아이콘" priority />
            </div>
          ) : (
            <RegisterButton
              width={74}
              height={42}
              disabled={false}
              onClick={() => {
                router.push("/signin");
              }}
            >
              로그인
            </RegisterButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
