import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAuth } from "@/src/contexts/AuthProvider";
import styles from "./Header.module.scss";
import Button from "@/src/components/Button/Button";
import { isMobileDevice } from "@/src/utils/isMobileDevice";
import logoIcon from "@/public/svgs/logo.svg";
import mobileLogoIcon from "@/public/svgs/logo-mobile.svg";
import defaultProfile from "@/public/svgs/default-profile.svg";

const isMobile = typeof window !== "undefined" && isMobileDevice();

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const isAuthPath = router.pathname.startsWith("/auth");

  if (isAuthPath) {
    return null; // /auth 이하 경로에서는 Header 안보이게
  }

  const setCurrentPage = (path: string) => {
    return {
      color:
        typeof window !== "undefined" && window.location.pathname === path
          ? "#3692ff"
          : "#4b5563",
    };
  };

  return (
    <header className={styles.container}>
      <div className={styles.headerLeft}>
        <Link href="/" passHref>
          <Image
            src={isMobile ? mobileLogoIcon : logoIcon}
            alt="판다마켓 로고"
            width={154}
            height={50}
          />
        </Link>

        <nav className={styles.navContainer}>
          <Link href="/boards" style={setCurrentPage("/boards")}>
            자유게시판
          </Link>
          <Link href="/items" style={setCurrentPage("/items")}>
            중고마켓
          </Link>
        </nav>
      </div>
      {user ? (
        <div className={styles.headerRight}>
          <Image
            src={defaultProfile}
            alt="기본 프로필 이미지"
            width={40}
            height={40}
          />
          <div className={styles.userControl}>
            <div className={styles.user}>
              <span>{user.nickname}</span>님
            </div>
            <div className={styles.signOut} onClick={signOut}>
              로그아웃
            </div>
          </div>
        </div>
      ) : (
        <Button onClick={() => router.push("/auth/signin")}>로그인</Button>
      )}
    </header>
  );
}
