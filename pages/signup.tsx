import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Auth.module.scss";
import QuickLogin from "@/components/auth/QuickLogin";
import SignupForm from "@/components/auth/SignupForm";

function Signup() {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image alt="판다마켓 홈" src="/images/logo.png" fill />
        </Link>
      </header>

      <main className={styles.main}>
        <SignupForm />
        <QuickLogin />
        <div className={styles.go_login}>
          <p>이미 회원이신가요?</p>
          <Link href="/login">로그인</Link>
        </div>
      </main>
    </>
  );
}

export default Signup;
