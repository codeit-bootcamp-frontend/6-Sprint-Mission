import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import headerLogo from "../public/header-logo.png";
import signImg from "../public/sign-img.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menus}>
          <li className={styles.title}>
            <Image src={headerLogo} width={40} height={40} alt='로고' />
            <h1>판다마켓</h1>
          </li>
          <li className={styles.links}>
            <Link className={styles.link} href='/boards'>
              자유게시판
            </Link>
            <Link className={styles.link} href='/'>
              중고마켓
            </Link>
          </li>
        </ul>
        <div>
          <Image src={signImg} width={40} height={40} alt='로그인 이미지' />
        </div>
      </nav>
    </header>
  );
}
