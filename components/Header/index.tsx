import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import logo from "@/images/panda_market_home_logo.png";
import user_icon from "@/images/ic_user.png";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

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
          <div className={styles.user_icon}>
            <Image src={user_icon} fill alt="유저 아이콘" priority />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
