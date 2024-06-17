import styles from '@/styles/Input.module.css';

function Input({ placeholder = '', type = '' }) {
  const inputClassName = `${styles.input} ${
    type === 'search' && styles.search
  }`;

  return (
    <>
      <input type="text" placeholder={placeholder} className={inputClassName} />
    </>
  );
}

export default Input;
