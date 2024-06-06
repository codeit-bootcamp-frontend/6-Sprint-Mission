import { Link } from 'react-router-dom'
import HeartIcon from '../images/ic_heart.png'
import styles from '../styles/ItemCard.module.css'

// toLocaleString 천 단위로 콤마 찍기
function ItemCard({ item }) {
  return (
    <Link to={`/items/${item.id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.itemCard}>
        <img
          src={item.images[0]}
          alt={item.name}
          className={styles.itemCardThumbnail}
        />
        <div className={styles.itemSummary}>
          <h2 className={styles.itemName}>{item.name}</h2>
          <p className={styles.itemPrice}>{item.price.toLocaleString()}원</p>
          <div className={styles.favoriteCount}>
            <img className={styles.heartIcon} src={HeartIcon} alt="하트" />
            {item.favoriteCount}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ItemCard
