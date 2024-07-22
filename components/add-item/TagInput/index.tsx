import React, { useState, KeyboardEvent, ChangeEvent, SetStateAction, Dispatch } from 'react';
import styles from './tag-input.module.css';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import deleteBtn from '@/public/images/icons/ic_X.svg';

type Props = {
  name: string;
  tagList: string[];
  setTagList: Dispatch<SetStateAction<string[]>>;
};

export default function TagInput({ name, tagList, setTagList }: Props) {
  const [tag, setTag] = useState('');
  const uuid = uuidv4();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (tag.trim() !== '' && e.key === 'Enter') {
      if (e.nativeEvent.isComposing === false) {
        setTagList([tag, ...tagList]);
        e.preventDefault();
        setTag('');
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleDeleteClick = (tagValue: string) => {
    const remainTags = tagList.filter(tag => tag !== tagValue);
    setTagList(remainTags);
  };

  return (
    <div>
      <label htmlFor='tag' className={styles.formLabel}>
        태그
        <input
          id='tag'
          name={name}
          value={tag}
          type='text'
          placeholder='태그를 입력해주세요'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.formInput}
        />
      </label>
      <div className={styles.tagContainer}>
        {tagList.map(tagItem => {
          return (
            <div key={uuid} className={styles.tag}>
              <p className={styles.tag__text}>{tagItem}</p>
              <button
                className='absolute right-2 top-2 md:left-[313px] lg:left-[313px]'
                onClick={() => handleDeleteClick(tagItem)}>
                <Image src={deleteBtn} width={24} alt='삭제버튼' />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
