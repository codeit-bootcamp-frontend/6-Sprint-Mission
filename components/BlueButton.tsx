import styles from "@/components/BlueButton.module.css";

export default function BlueButton({ type = "", children }) {
  return (
    <button type={type} className={styles.write}>
      {children}
    </button>
  );
}
