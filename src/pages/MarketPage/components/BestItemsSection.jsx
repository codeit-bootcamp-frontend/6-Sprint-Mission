import { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import { getProducts } from '../../../api'
import styles from '../styles/BestItemsSection.module.css'

// 모바일 1개, 태블릿 2개, 데스크탑 4개
const getPageSize = () => {
  const width = window.innerWidth
  if (width < 768) {
    return 1
  } else if (width < 1280) {
    return 2
  } else {
    return 4
  }
}

function BestItemsSection() {
  const [itemList, setItemList] = useState([])
  const [pageSize, setPageSize] = useState(getPageSize())

  const fetchSortedData = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, pageSize })
    setItemList(products.list)
  }

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize())
    }

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener('resize', handleResize)
    fetchSortedData({ orderBy: 'favorite', pageSize })

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [pageSize])

  return (
    <div className={styles.bestItemsContainer}>
      <h1 className={styles.sectionTitle}>베스트 상품</h1>
      <div className={styles.bestItemsCardSection}>
        {itemList?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  )
}

export default BestItemsSection
