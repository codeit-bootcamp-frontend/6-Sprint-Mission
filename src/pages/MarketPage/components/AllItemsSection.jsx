import { useEffect, useState } from 'react'
import { getProducts } from '../../../api'
import ItemCard from './ItemCard'
import SearchIcon from '../images/ic_search.png'
import { Link } from 'react-router-dom'
import DropdownMenu from '../../../components/DropdownMenu'
import styles from '../styles/AllItemsSection.module.css'
import PaginationBar from '../../../components/PaginationBar'

// 모바일 4개, 태블릿 6개, 데스크탑 10개
const getPageSize = () => {
  const width = window.innerWidth
  if (width < 768) {
    return 4
  } else if (width < 1280) {
    return 6
  } else {
    return 10
  }
}

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState('recent')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(getPageSize())
  const [itemList, setItemList] = useState([])
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [totalPageNum, setTotalPageNum] = useState()

  const fetchSortedData = async ({ orderBy, page, pageSize }) => {
    const products = await getProducts({ orderBy, page, pageSize })
    setItemList(products.list)
    setTotalPageNum(Math.ceil(products.totalCount / pageSize))
  }

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption)
    setIsDropdownVisible(false)
  }

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize())
    }

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener('resize', handleResize)
    fetchSortedData({ orderBy, page, pageSize })

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [orderBy, page, pageSize])

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  const onPageChange = (pageNumber) => {
    setPage(pageNumber)
  }

  return (
    <div className={styles.allItemsSectionWrapper}>
      <div className={styles.allItemsSectionHeader}>
        <h1 className={styles.sectionTitle}>전체 상품</h1>

        <div className={styles.allItemsSectionNav}>
          <div className={styles.searchBarWrapper}>
            <img
              className={styles.searchBarIcon}
              src={SearchIcon}
              alt="돋보기"
            />
            <input
              className={styles.searchBarInput}
              placeholder="검색할 상품을 입력해 주세요"
            />
          </div>
          <Link to="/additem" className={styles.linkButton}>
            상품 등록하기
          </Link>
          <DropdownMenu onSortSelection={handleSortSelection} />
        </div>
      </div>

      <div className={styles.allItemsCardSection}>
        {itemList?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
      </div>

      <div className={styles.paginationBarWrapper}>
        <PaginationBar
          totalPageNum={totalPageNum}
          activePageNum={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default AllItemsSection
