import Image from "next/image";
import spinnerImg from "@/public/icons/spinner.svg";
import styles from "./Spinner.module.scss";

export default function Spinner({ className = "" }) {
  return (
    <Image
      className={`${styles.spinner} ${className}`}
      src={spinnerImg}
      width={45}
      height={45}
      alt="로딩 중...."
    />
  );
}
