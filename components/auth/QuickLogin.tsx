import Image from "next/image";
import styles from "./QuickLogin.module.scss";

function QuickLogin() {
  return (
    <div className={styles.quick_login}>
      <p>간편 로그인하기</p>
      <div className={styles.sns}>
        <a href="https://www.google.com/">
          <Image
            alt="google 아이콘"
            src="/images/social/google_logo.svg"
            width={42}
            height={42}
          />
        </a>
        <a href="https://www.kakaocorp.com/page/">
          <Image
            alt="kakao 아이콘"
            src="/images/social/kakao_logo.svg"
            width={42}
            height={42}
          />
        </a>
      </div>
    </div>
  );
}

export default QuickLogin;
