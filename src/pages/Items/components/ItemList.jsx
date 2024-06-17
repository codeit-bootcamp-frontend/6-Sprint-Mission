import styles from '@/styles/ItemList.module.css';
import HeartIcon from '@/assets/images/heart_icon.png';

function ItemList({ items, className = '' }) {
  //items라는 배열을 prop으로 받음
  //map의 콜백함수에서 JSX로 작성한 값을 리턴함
  return (
    <ul className={`${styles.item_list} ${styles[className]}`}>
      {items?.map((item) => {
        return (
          <li key={item.id}>
            <div className={styles.img}>
              <img src={item.images} alt={item.name} />
            </div>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.price}>{item.price}</div>
            <div className={styles.count}>
              <img src={HeartIcon} alt="좋아요 아이콘" />
              {item.favoriteCount}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ItemList;
