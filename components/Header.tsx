import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.leftbox}>
          <Link href="/">
            <div className={styles.logo}>
              <Image src="/logo.png" width={153} height={51} alt="로고" />
            </div>
          </Link>
          <Link href="/boards">
            <div className={styles.nav}>자유게시판</div>
          </Link>
          <Link href="#">
            <div className={styles.nav}>중고마켓</div>
          </Link>
        </div>
        <Link href="#">
          <div className={styles.profile}>
            <Image
              src="/Img/user.svg"
              width={40}
              height={40}
              alt="프로필 사진"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
