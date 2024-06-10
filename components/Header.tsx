import styles from './Header.module.css';
import Link from 'next/link';


const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.leftbox}>
        <Link href="/">
          <div className={styles.logo}>
            <img src='/logo.png' alt='로고' />
          </div>
        </Link>
        <Link href="/boards">
          <div className={styles.nav}>
            자유게시판
          </div>
        </Link>
        <Link href="#">
          <div className={styles.nav}>
            중고마켓
          </div>
        </Link>
        </div>
        <Link href="#">
          <div className={styles.profile}>
            <img src='/user_profile.png' alt='프로필사진' />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
