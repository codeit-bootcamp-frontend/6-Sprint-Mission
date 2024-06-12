import styles from "@/styles/signin.module.css";
import Link from "next/link";
import Image from "next/image";
import pandaLogo from "@/public/icon/panda_logo.svg";
import SocialLogin from "@/components/socialLogin";
import SignInForm from "@/components/signin/signinForm";

export default function SignIn() {
  return (
    <div className={styles.signin_container}>
      <Link href="/" className={styles.signin_logo}>
        <Image src={pandaLogo} alt="판다마켓" width={396} />
      </Link>
      <SignInForm />
      <SocialLogin />
      <div className={styles.switch_signup}>
        판다마켓이 처음이신가요? <Link href="/signup">회원가입</Link>
      </div>
    </div>
  );
}
