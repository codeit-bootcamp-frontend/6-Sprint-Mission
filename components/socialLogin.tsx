import styles from "@/styles/signin.module.css";
import googleLogo from "@/public/icon/google-logo.png";
import kakaoLogo from "@/public/icon/kakao-logo.png";
import Image from "next/image";
import Link from "next/link";

export default function SocialLogin() {
  return (
    <div className={styles.social_login}>
      <div>
        <p>간편 로그인하기</p>
      </div>
      <div className={styles.social_login_img}>
        <div>
          <Link
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={googleLogo} alt="구글로그인" width={42} />
          </Link>
        </div>
        <div>
          <Link
            href="https://www.kakaocorp.com/page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={kakaoLogo} alt="카카오로그인" width={42} />
          </Link>
        </div>
      </div>
    </div>
  );
}
