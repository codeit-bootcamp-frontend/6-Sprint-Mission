import styles from './Header.module.css'
import HeaderLogo from '../images/logo.png'

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <img
          className={styles.headerLogo}
          src={HeaderLogo}
          alt="판다마켓 로고"
        ></img>
        <p className={styles.freeBoard}>자유게시판</p>
        <p className={styles.usedMarket}>중고마켓</p>
      </div>
      <button className={styles.loginButton}>로그인</button>
    </div>
  )
}

export default Header
