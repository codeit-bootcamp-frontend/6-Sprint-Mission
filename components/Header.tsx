import Link from "next/link";
import styles from "./Header.module.css";
import Container from "./Container";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className={styles.leftNav}>
          <Link href="/">
            <Image
              src="/icon/header-logoIcon.png"
              alt="Home Logo"
              width={153}
              height={51}
              priority
            />
          </Link>
          <Link href="/boards">
            <div>자유게시판</div>
          </Link>
          <Link href="/market">
            <div>중고마켓</div>
          </Link>
        </div>
        <div className={styles.rightNav}>
          <Link href="/join">
            <Image
              src="/icon/profile-login-icon.png"
              alt="user profile"
              width={40}
              height={40}
            />
          </Link>
          <Link href="/setting">
            <div>설정</div>
          </Link>
        </div>
      </Container>
    </header>
  );
}
