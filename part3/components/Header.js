import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.nav}>
      <div className={styles.logo}>
        <Image fill src="/logo_face.png" alt="판다마켓" />
      </div>
      <ul className={styles.nav_menu}>
        <Link className={styles.link_styles} href="/boards">
          자유게시판
        </Link>
        <Link className={styles.link_styles} href="/">
          중고마켓
        </Link>
      </ul>
      <Link className={styles.link_styles} href="/auth/signIn">
        <div className={styles.login_btn}>
          <p className={styles.login_btn_text}>로그인</p>
        </div>
      </Link>
    </header>
  );
}

export default Header;
