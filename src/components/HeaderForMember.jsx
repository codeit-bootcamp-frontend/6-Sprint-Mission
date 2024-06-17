// 로그인 했을 때 헤더
import styles from "./HeaderForMember.module.css";
import HeaderLogo from "../images/logo.png";
import ProfileLogo from "../images/ic_profile.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <Link to="/">
          <img
            className={styles.headerLogo}
            src={HeaderLogo}
            alt="판다마켓 로고"
          ></img>
        </Link>
        <p className={styles.freeBoard}>자유게시판</p>
        <Link to="/items" className={styles.usedMarket}>
          중고마켓
        </Link>
      </div>
      <img src={ProfileLogo} alt="프로필 이미지" />
    </div>
  );
}

export default Header;
