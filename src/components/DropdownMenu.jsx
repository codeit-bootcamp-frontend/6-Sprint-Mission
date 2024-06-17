import { useState } from 'react'
import arrowDown from '../images/ic_arrow_down.png'
import styles from './DropdownMenu.module.css'

function DropdownMenu({ onSortSelection }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [sortSelection, setSortSelection] = useState('최신순')

  const sortingOptions = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'favorite' },
  ]

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible)

  const handleSortSelection = (value, label) => {
    onSortSelection(value)
    setSortSelection(label)
    setIsDropdownVisible(false)
  }

  return (
    <div className={styles.dropdownButtonWrapper}>
      <button
        className={styles.dropdownButton}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isDropdownVisible}
      >
        {sortSelection}
        <img className="dropdownToggle" src={arrowDown} alt="드롭다운 토글" />
      </button>

      {isDropdownVisible && (
        <div className={styles.dropdownSortingOptions}>
          {sortingOptions.map((option) => (
            <div
              key={option.value}
              className={styles.dropdownSortingOption}
              onClick={() => handleSortSelection(option.value, option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
