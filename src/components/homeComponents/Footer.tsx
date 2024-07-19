import facebookIcon from "@/assets/icons/facebook_ic.svg";
import twitterIcon from "@/assets/icons/twitter_ic.svg";
import youtubeIcon from "@/assets/icons/youtube_ic.svg";
import instagramIcon from "@/assets/icons/instagram_ic.svg";
import { css } from "@/styled-system/css";
import { hstack } from "@/styled-system/patterns";
import Image from "next/image";

function Footer() {
  return (
    <div className={css({ bg: "#111322", w: "full", h: "170px" })}>
      <div
        className={hstack({
          pt: "32px",
          px: "104px",
          justifyContent: "space-between",
        })}
      >
        <p
          className={css({
            color: "#676767",
          })}
        >
          @codeit - 2024
        </p>
        <div
          className={hstack({
            color: "#CFCFCF",
            gap: "30px",
          })}
        >
          <p>Privacy - Policy</p>
          <p>FAQ</p>
        </div>
        <div
          className={hstack({
            gap: "12px",
          })}
        >
          <Image src={facebookIcon} alt="페이스북" />
          <Image src={twitterIcon} alt="트위터" />
          <Image src={youtubeIcon} alt="유튜브" />
          <Image src={instagramIcon} alt="인스타그램" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
