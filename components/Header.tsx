import Link from 'next/link';
import styles from './Header.module.css';
import { useIsMobile } from '@/hooks/useIsMobile';
import Image from 'next/image';
import logo from '@/public/logo.png';
import mobileLogo from '@/public/logo-mobile.png';
import profileIcon from '@/public/icon/profile.png';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.menus}>
          <div className={styles.logo}>
            <Link href="/">
              <Image
                fill
                src={useIsMobile() ? mobileLogo : logo}
                alt="판다마켓 로고"
              />
            </Link>
          </div>
          <Link href="/board">자유게시판</Link>
          <Link href="/market">중고마켓</Link>
        </div>
        <div className={styles.icon}>
          <Link href="">
            <Image fill src={profileIcon} alt="마이페이지로 이동" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
