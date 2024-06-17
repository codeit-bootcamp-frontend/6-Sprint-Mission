import AllItems from './components/AllItems';
import BestItems from './components/BestItems';
import styles from '@/styles/Items.module.css';

function Items() {
  return (
    <main className="wrapper">
      <div className="inner">
        <BestItems titleClassName={styles.title} />
        <AllItems titleClassName={styles.title} />
      </div>
    </main>
  );
}

export default Items;
