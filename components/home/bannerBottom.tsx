import styles from "@/styles/home.module.css"

const BannerBottom: React.FC = () => {
  return (
    <section className={styles["banner-bottom"]}>
      <div>
        <h1>믿을 수 있는<br />판다마켓 중고거래</h1>
      </div>
    </section>
  );
};

export default BannerBottom;