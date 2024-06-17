import React from 'react'
import styles from './PaginationBar.module.css'
import leftArrow from '../images/ic_arrow_left.png'
import rightArrow from '../images/ic_arrow_right.png'

const PaginationBar = ({ totalPageNum, activePageNum, onPageChange }) => {
  const maxVisiblePages = 5
  let startPage

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1)
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1)
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  )

  return (
    <div className={styles.paginationBar}>
      <button
        className={styles.paginationButton}
        disabled={activePageNum === 1}
        onClick={() => onPageChange(activePageNum - 1)}
      >
        <img className={styles.paginationArrow} src={leftArrow} alt="<" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.paginationButton} ${
            activePageNum === page ? styles.active : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={styles.paginationButton}
        disabled={activePageNum === totalPageNum}
        onClick={() => onPageChange(activePageNum + 1)}
      >
        <img className={styles.paginationArrow} src={rightArrow} alt=">" />
      </button>
    </div>
  )
}

export default PaginationBar
