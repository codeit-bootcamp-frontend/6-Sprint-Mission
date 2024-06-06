import styles from "./Dropdown.module.css";
import dropdownIcon from "../assets/ic_arrow_down.svg";

function Dropdown() {
  const ORDER = "최신순";

  return (
    <div className={styles.dropdown}>
      {ORDER}
      <img src={dropdownIcon} alt="드롭다운 아이콘" />
    </div>
  );
}

export default Dropdown;
