import styles from "./Button.module.css";

function Button({ text }) {
  return <button className={styles.button}>{text}</button>;
}

export default Button;
