import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/ic_logo.svg";
import Button from "./Button";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>
        <ul className={styles.navbar}>
          <li>
            <NavLink
              to="/boards"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              자유게시판
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              중고마켓
            </NavLink>
          </li>
        </ul>
      </div>
      <Button text={"로그인"} />
    </header>
  );
}

export default Header;
