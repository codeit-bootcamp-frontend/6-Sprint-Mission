import { useState } from 'react';
import FileInput from './FileInput';
import styles from '../../styles/AddItem.module.css';

function AddItem() {
  const [values, setValues] = useState({
    imgFile: null,
  });

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <main className="wrapper">
      <div className="inner">
        <div className={styles.addItemWrap}>
          <form>
            <div className={styles.addItemTop}>
              <h2 className={styles.title}>상품 등록하기</h2>
              <button type="submit">등록</button>
            </div>

            <div className={styles.label}>상품 이미지</div>
            <FileInput
              name="imgFile"
              value={values.imgFile}
              onChange={handleChange}
            />
            <div className={styles.label}>상품명</div>
            <input
              type="text"
              name="item_name"
              placeholder="상품명을 입력해주세요"
            />

            <div className={styles.label}>상품 소개</div>
            <textarea
              name="item_content"
              placeholder="상품 소개를 입력해주세요"
            ></textarea>

            <div className={styles.label}>판매가격</div>
            <input
              type="number"
              name="item_price"
              placeholder="판매 가격을 입력해주세요"
            />

            <div className={styles.label}>태그</div>
            <input
              type="text"
              name="item_tag"
              placeholder="태그를 입력해주세요"
            />
          </form>
        </div>
      </div>
    </main>
  );
}

export default AddItem;
