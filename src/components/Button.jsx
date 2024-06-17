import styles from '@/styles/Button.module.css';

function Button({ children }) {
  return (
    <>
      <button type="button" className={styles.button}>
        {children}
      </button>
    </>
  );
}

export default Button;
