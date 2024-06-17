import styles from "@/components/Header/Header.module.css";
import Image from "next/image";
import logo from "@/public/logo.svg";
import profileIcon from "@/public/ic_profile.svg";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const getLinkClassName = (path: string) => {
    return router.pathname === path ? `${styles["nav-link"]} ${styles.active}` : styles["nav-link"];
  };

  return (
    <div className={styles["header"]}>
      <div className={styles["header-container1"]}>
        <Link className={styles["logo-container"]} href="/">
          <Image
            className={styles["logo"]}
            src={logo}
            alt="panda market logo"
          />
        </Link>
        <div className={styles["nav-links"]}>
          <Link href="/boards" className={getLinkClassName("/boards")}>
            자유게시판
          </Link>
          <Link href="/items" className={getLinkClassName("/items")}>
            중고마켓
          </Link>
        </div>
      </div>
      
      <Image
        className={styles["profile-icon"]}
        src={profileIcon}
        alt="profile icon"
      />
    </div>
  );
};

export default Header;
