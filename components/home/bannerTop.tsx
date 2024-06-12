import Link from "next/link";
import styles from "@/styles/home.module.css";

const BannerTop: React.FC = () => {
  return (
    <section className={styles["banner-top"]}>
      <div>
        <h1>
          일상의 모든 물건을 <br />
          거래해보세요
        </h1>
        <Link href="/items" className={styles["btn-items"]}>
          구경하러가기
        </Link>
      </div>
    </section>
  );
};

export default BannerTop;
