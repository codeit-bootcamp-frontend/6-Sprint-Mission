import Image from "next/image";
import Link from "next/link";
import pandaLogo from "@/public/img/img_pandalogo.svg";
import pandatext from "@/public/img/img_pandatext.svg";
import userProfile from "@/public/user/userprofile.svg";
import styles from "@/styles/Header.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const pathname = router.pathname;

  useEffect(() => {
    // 로컬 스토리지에서 토큰 확인
    const accessToken = localStorage.getItem("accessToken");
    setIsLogin(!!accessToken);
  }, []);

  useEffect(() => {
    // 라우트 변경 시 토큰 확인
    const checkToken = () => {
      const accessToken = localStorage.getItem("accessToken");
      setIsLogin(!!accessToken);
    };

    router.events.on("routeChangeComplete", checkToken);
    // 새로운 페이지로 이동이 되었을 때 발생하는 이벤트

    return () => {
      router.events.off("routeChangeComplete", checkToken);
    };
    // 컴포넌트가 언마운트 될 때, 이벤트 리스너 삭제
  }, [router.events]);

  return (
    <>
      <div className={styles.Header}>
        <div className={styles["Header-container"]}>
          <Link href="/">
            <Image
              className={styles["Header-logo"]}
              src={pandaLogo}
              alt="판다마켓 로고"
            />
            <Image
              className={styles["Header-logo-mob"]}
              src={pandatext}
              alt="모바일 판다마켓 로고"
            />
          </Link>
          <div className={styles["Header-link-container"]}>
            <Link
              className={
                styles[
                  pathname === "/boards" ? "Header-link-act" : "Header-link"
                ]
              }
              style={{ textDecoration: "none" }}
              href="/boards"
            >
              자유게시판
            </Link>
            <Link
              className={
                styles[
                  pathname === "/items" ? "Header-link-act" : "Header-link"
                ]
              }
              style={{ textDecoration: "none" }}
              href="/"
            >
              중고마켓
            </Link>
          </div>
        </div>
        <div className={styles["Header-profile"]}>
          {isLogin ? (
            <Link href="/profile">
              <Image
                width={40}
                height={40}
                src={userProfile}
                alt="유저 프로필 사진"
              />
            </Link>
          ) : (
            <div className={styles.HeaderLogin}>
              <Link href="/signin">로그인</Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles["Header-empty"]}></div>
    </>
  );
}
