import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <main>
        <section className={styles.top}>
          <div className={styles["home-top"]}>
            <h2>
              일상의 모든 물건을
              <br />
              거래해보세요
            </h2>
            <Link href="/Items">구경하러 가기</Link>
          </div>
          <div className={styles["img-top"]}>
            <Image
              src="/images/Home/home_top.png"
              alt="메인 홈페이지 최상위 이미지"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>

        <section className={`${styles.section} ${styles.container}`}>
          <div className={styles["section-img"]}>
            <Image
              src="/images/Home/home01.png"
              alt="메인 홈페이지 섹션 첫번째 이미지"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={`${styles["section-description"]} ${styles.first}`}>
            <p>Hot item</p>
            <h2>
              인기 상품을
              <br />
              확인해 보세요
              <br />
            </h2>
            <h3>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </h3>
          </div>
        </section>

        <section className={`${styles.section} ${styles["section-reverse"]} ${styles.container}`}>
          <div className={styles["section-reverse-img"]}>
            <Image
              src="/images/Home/home02.png"
              alt="메인 홈페이지 섹션 두번째 이미지"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles["section-reverse-description"]}>
            <p>Search</p>
            <h2>
              구매를 원하는
              <br />
              상품을 검색하세요
              <br />
            </h2>
            <h3>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </h3>
          </div>
        </section>

        <section className={`${styles.section} ${styles.container}`}>
          <div className={styles["section-img"]}>
            <Image
              src="/images/Home/home03.png"
              alt="메인 홈페이지 섹션 세번째 이미지"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles["section-description"]}>
            <p>register</p>
            <h2>판매를 원하는 상품을 등록하세요</h2>
            <h3>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </h3>
          </div>
        </section>

        <section className={styles.bottom}>
          <h2>
            믿을수 있는
            <br />
            판다마켓 중고거래
          </h2>
          <div className={styles["img-bottom"]}>
            <Image
              src="/images/Home/home_bottom.png"
              alt="메인 홈페이지 최하단 이미지"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>
      </main>
      ;
    </>
  );
}
