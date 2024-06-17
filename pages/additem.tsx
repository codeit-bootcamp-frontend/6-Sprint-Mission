import React from "react";
import styles from "@/styles/Home.module.scss";
import Button from "@/components/Button";
import Header from "@/components/Header";

const Additem = () => {
  return (
    <>
      <Header />
      <main className={styles.padding_content}>
        <div className={styles.sub_category_area}>
          <p className={styles.sub_category_text}>상품 등록하기</p>
          <div className={styles.sub_category_util}>
            <Button
              text={"등록"}
              className={"btn_style"}
              onClick={() => {
                console.log("버튼");
              }}
            />
          </div>
        </div>
        <section>
          <form>
            <div className={styles.create_item_area}>
              <label>상품 이미지</label>
              <input type="file" />
            </div>
            <div className={styles.create_item_area}>
              <label>상품명</label>
              <input type="text" />
            </div>
            <div className={styles.create_item_area}>
              <label>상품소개</label>
              <textarea />
            </div>
            <div className={styles.create_item_area}>
              <label>판매가격</label>
              <input type="number" />
            </div>
            <div className={styles.create_item_area}>
              <label>태그</label>
              <input type="text" />
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Additem;
