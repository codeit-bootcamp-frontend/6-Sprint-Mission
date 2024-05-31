import styles from './Header.module.css';

type props = {
  text: string;
};

export default function SectionTitle({ text }: props) {
  return <h2 className={styles.title}>{text}</h2>;
}
