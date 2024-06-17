import Image from "next/image";
import styles from "./ArticleImage.module.scss";

export default function ArticleImage({ imageSrc }: { imageSrc: string }) {
  return (
    <div className={styles.image_container}>
      <Image
        src={imageSrc}
        alt="첨부 이미지"
        width="48"
        height="48"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
