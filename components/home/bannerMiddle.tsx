import React from "react";
import img1 from "@/public/icon/img_home_01.svg";
import img2 from "@/public/icon/img_home_02.svg";
import img3 from "@/public/icon/img_home_03.svg";
import Image from "next/image";
import styles from "@/styles/home.module.css";

const BannerMiddle: React.FC = () => {
  return (
    <section className={styles["banner-middle"]}>
      <div className={styles.item}>
        <Image src={img1} alt="아이템1" />
        <div className={styles["item-text"]}>
          <h2 className={styles["title"]}>Hot Item</h2>
          <h3 className={styles["subtitle"]}>
            인기 상품을{" "}
            <span className={styles["break-on-desktop"]}>
              <br />
            </span>
            확인해보세요
          </h3>
          <p className={styles["description"]}>
            가장 HOT한 중고거래 물품을
            <br />
            판다 마켓에서 확인해 보세요
          </p>
        </div>
      </div>
      <div className={styles.item}>
        <Image src={img2} alt="아이템2" />
        <div className={`${styles["item-text"]} ${styles.right}`}>
          <h2 className={styles.title}>Search</h2>
          <h3 className={styles.subtitle}>
            구매를 원하는{" "}
            <span className={styles["break-on-desktop"]}>
              <br />
            </span>
            상품을 검색하세요
          </h3>
          <p className={styles.description}>
            구매하고 싶은 물품은 검색해서
            <br />
            쉽게 찾아보세요
          </p>
        </div>
      </div>
      <div className={styles.item}>
        <Image src={img3} alt="아이템3" />
        <div className={styles["item-text"]}>
          <h2 className={styles.title}>Register</h2>
          <h3 className={styles.subtitle}>
            판매를 원하는{" "}
            <span className={styles["break-on-desktop"]}>
              <br />
            </span>
            상품을 등록하세요
          </h3>
          <p className={styles.description}>
            어떤 물건이든 판매하고 싶은 상품을
            <br />
            쉽게 등록하세요
          </p>
        </div>
      </div>
    </section>
  );
};

export default BannerMiddle;
