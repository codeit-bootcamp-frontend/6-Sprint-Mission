import React, { useState } from 'react';
import styles from './style.module.css'; // CSS module import

interface DropdownProps {
  options: string[];
  handleClickItem: (label: string) => void;
}

const NewDropDown = ({ options, handleClickItem }: DropdownProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [labelName, setLabelName] = useState<string>(options[0]);

  const onClickItem = (label: string) => {
    setIsVisible(false);
    setLabelName(label);
    handleClickItem(label);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={styles.dropdownButton}
      >
        <span>{labelName}</span>
        <span
          className={`${styles.arrow} ${isVisible ? styles.rotateArrow : ''}`}
        >
          ▾
        </span>
      </button>

      {isVisible && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <li
              className={`${styles.dropdownItem} ${
                index === 0 ? styles.firstItem : ''
              }`}
              key={option}
              onClick={() => onClickItem(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewDropDown;
