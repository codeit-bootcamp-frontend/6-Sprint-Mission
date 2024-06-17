import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Nav.module.scss";
import { useDevice } from "@/contexts/DeviceContext";
import { DEVICE } from "@/constants/Device";
import { useEffect, useState } from "react";

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Logo />
        <ul className={styles.menu}>
          <li>
            <Menu path="/boards" menu="자유게시판" />
          </li>
          <li>
            <Menu path="/items" menu="중고마켓" />
          </li>
        </ul>
      </div>
      <Auth />
    </nav>
  );
}

function Logo() {
  const device = useDevice();

  return (
    <Link href="/">
      {device === DEVICE.MOBILE ? (
        <Image
          alt="판다마켓 로고"
          src="/images/logo_text.png"
          width="81"
          height="40"
        />
      ) : (
        <Image
          alt="판다마켓 로고"
          src={"/images/logo.png"}
          width="153"
          height="51"
        />
      )}
    </Link>
  );
}

function Menu({ path, menu }: { path: string; menu: string }) {
  const router = useRouter();

  const className = path === router.pathname ? styles.active : "";

  return (
    <Link href={path} className={className}>
      {menu}
    </Link>
  );
}

function Auth() {
  const [isAuthentic, setIsAuthentic] = useState(false);

  useEffect(() => {
    setIsAuthentic(Boolean(localStorage.getItem("accessToken")));
  }, []);

  return (
    <>
      {isAuthentic ? (
        <Image
          alt="프로필 이미지"
          src="/icons/profile.svg"
          width={40}
          height={40}
        />
      ) : (
        <Link className={styles.login_button} href="/login">
          로그인
        </Link>
      )}
    </>
  );
}

export default Nav;
