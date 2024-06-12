import React from "react";
import fb from "@/public/icon/ic_facebook.svg";
import tw from "@/public/icon/ic_twitter.svg";
import yt from "@/public/icon/ic_youtube.svg";
import it from "@/public/icon/ic_instagram.svg";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/home.module.css"

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.codeit}>@codeit - 2024</p>
      </div>
      <div className={styles.FAQ}>
        <Link href="/privacy">Privacy Policy</Link>
        &emsp;
        <Link href="/faq">FAQ</Link>
      </div>
      <div className={styles.LinkDiv}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com"
        >
          <Image src={fb} alt="facebook" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.twitter.com"
        >
          <Image src={tw} alt="twitter" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com"
        >
          <Image src={yt} alt="youtube" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/"
        >
          <Image src={it} alt="instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
