import HorizonLine from '../../../components/HorizontalLine'
import styles from '../styles/ItemDetailSection.module.css'
import heartIcon from '../../../images/ic_heart.png'
import TagDisplay from '../../../components/TagDisplay'

function ItemDetailSection({ item }) {
  return (
    <div className={styles.itemDetailWrapper}>
      <div>
        <img className={styles.itemImage} src={item.images} alt="상품 사진" />
      </div>
      <div className={styles.itemDetailSection}>
        <div>
          <p className={styles.itemName}>{item.name}</p>
          <p className={styles.itemPrice}>{item.price.toLocaleString()}원</p>
        </div>
        <HorizonLine />
        <div>
          <p className={styles.sectionTitle}>상품 소개</p>
          <p className={styles.itemDescription}>{item.description}</p>
        </div>
        <div>
          <p className={styles.sectionTitle}>상품 태그</p>
          <TagDisplay tags={item.tags} />
        </div>
        <button className={styles.favoriteButton}>
          <img className={styles.heartIcon} src={heartIcon} alt="하트" />
          <p>{item.favoriteCount}</p>
        </button>
      </div>
    </div>
  )
}

export default ItemDetailSection
