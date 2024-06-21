import React from "react";
import styles from "@/styles/Main.module.css";
import Image from "next/image";
import Link from "next/link";
import img_header from "@/public/img/img_header_1.png";
import img_footer from "@/public/img/img_footer_1.png";
import img_main_1 from "@/public/img/img_main_1.png";
import img_main_2 from "@/public/img/img_main_2.png";
import img_main_3 from "@/public/img/img_main_3.png";
import ic_facebook from "@/public/icon/ic_facebook.png";
import ic_twitter from "@/public/icon/ic_twitter.png";
import ic_youtube from "@/public/icon/ic_youtube.png";
import ic_instagram from "@/public/icon/ic_instagram.png";

export default function Main() {
  return (
    <main>
      <section className={styles.pandaBanner}>
        <div className={styles.pandaBannerDiv}>
          <div className={styles.pandaBannertext}>
            <h1>
              <span>일상의 모든 물건을</span>
              <span> 거래해 보세요</span>
            </h1>
            <Link href="/items.html" className={styles.itemButton}>
              구경하러 가기
            </Link>
          </div>
          <Image
            className={styles.buypanda}
            src={img_header}
            width={600}
            height={400}
            alt="판다마켓 헤더 이미지"
          />
        </div>
      </section>

      <section className={styles.panderMain}>
        <Image
          className={styles.panderImg}
          src={img_main_1}
          alt="메인 이미지 1"
        />
        <div className={styles.panderInfo}>
          <span className={styles.infoBadge}>Hot item</span>
          <h2 className={styles.infoTitle}>
            <span>인기 상품을</span>
            <span>확인해 보세요</span>
          </h2>
          <p>
            가장 HOT한 중고거래 물품을 <br />
            판다 마켓에서 확인해 보세요
          </p>
        </div>
      </section>

      <section className={styles.panderMain}>
        <div className={styles.panderInfoCenter}>
          <span className={styles.infoBadge}>Search</span>
          <h2 className={styles.infoTitle}>
            <span>구매를 원하는</span>
            <span>상품을 검색하세요</span>
          </h2>
          <p>
            구매하고 싶은 물품은 검색해서 <br />
            쉽게 찾아보세요
          </p>
        </div>
        <Image className={styles.panderImg} src={img_main_2} alt="Main 2" />
      </section>

      <section className={styles.panderMain}>
        <Image className={styles.panderImg} src={img_main_3} alt="Main 3" />
        <div className={styles.panderInfo}>
          <span className={styles.infoBadge}>Register</span>
          <h2 className={styles.infoTitle}>
            <span>판매를 원하는</span>
            <span>상품을 등록하세요</span>
          </h2>
          <p>
            어떤 물건이든 판매하고 싶은 상품을 <br />
            쉽게 등록하세요
          </p>
        </div>
      </section>

      <section className={styles.pandaBanner}>
        <div className={styles.pandaBannerDiv}>
          <div className={styles.pandaBannertext}>
            <h1>
              믿을 수 있는 <br />
              판다마켓 중고거래
            </h1>
          </div>
          <Image
            className={styles.buypanda}
            src={img_footer}
            alt="판다마켓 이미지"
            width={600}
            height={400}
          />
        </div>
      </section>

      <footer className={styles.pandaFooter}>
        <div className={styles.footerCopyright}>@codeit - 2024</div>
        <div className={styles.footerLink}>
          <Link href="/privacy.html">Privacy Policy</Link>
          <Link href="/faq.html">FAQ</Link>
        </div>
        <div className={styles.footerSns}>
          <Link target="_blank" href="https://www.facebook.com/">
            <Image src={ic_facebook} alt="페이스북" />
          </Link>
          <Link target="_blank" href="https://twitter.com/">
            <Image src={ic_twitter} alt="트위터" />
          </Link>
          <Link target="_blank" href="https://www.youtube.com/">
            <Image src={ic_youtube} alt="유튜브" />
          </Link>
          <Link target="_blank" href="https://www.instagram.com/">
            <Image src={ic_instagram} alt="인스타그램" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
