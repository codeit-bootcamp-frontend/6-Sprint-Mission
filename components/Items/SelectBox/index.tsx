import React, { useRef, useState } from 'react';
import styles from './select-box.module.css';
import Image from 'next/image';
import icArrowDown from '@/public/images/icons/ic_arrow_down.svg';

type Props = {
  handleSort: (sortType: string) => void;
};

export default function SelectBox({ handleSort }: Props) {
  const [isDisplay, setIsDisplay] = useState(false);
  const ulRef = useRef(null);
  const [title, setTitle] = useState('최신순');

  const handleButtonClick = () => {
    setIsDisplay(prevIsDisplay => !prevIsDisplay);
  };

  const handleNewestClick = () => {
    setTitle('최신순');
    setIsDisplay(false);
    handleSort('최신순');
  };

  const handleLikesClick = () => {
    setTitle('좋아요순');
    setIsDisplay(false);
    handleSort('좋아요순');
  };

  return (
    <div className={styles.selectBox}>
      <button className={styles.selectBox__btn} onClick={handleButtonClick}>
        {/* <Image src={icArrowDown} alt='드롭다운' /> */}
        <p className={styles.selectBox__btn__p}>
          <span>{title}</span>
          <Image src={icArrowDown} alt='아래 화살표' />
        </p>
      </button>
      {isDisplay && (
        <ul className={styles.selectBox__list} ref={ulRef}>
          <li>
            <button className={styles.selectBox__list__newestBtn} type='button' onClick={handleNewestClick}>
              최신순
            </button>
          </li>
          <li>
            <button className={styles.selectBox__list__likeBtn} type='button' onClick={handleLikesClick}>
              좋아요순
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
