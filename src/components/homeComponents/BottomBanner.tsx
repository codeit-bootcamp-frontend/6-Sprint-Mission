import bottomBannerImage from "@/assets/images/bottom-banner.png";
import { vstack } from "@/styled-system/patterns";
import { bannerTitle } from "@/css/home.styled";
import Image from "next/image";

function BottomBanner() {
  return (
    <div
      className={vstack({
        bg: "blueBanner",
        flexDirection: { base: "column", xl: "row" },
        gap: { base: "54px", md: "74px", xl: "69px" },
        justifyContent: "center",
      })}
    >
      <div
        className={vstack({
          gap: 0,
          mt: { base: "121px", md: "201px", xl: "0px" },
        })}
      >
        <p className={bannerTitle}>
          믿을 수 있는
          <br />
          판다마켓 중고 거래
        </p>
      </div>
      <Image src={bottomBannerImage} alt="판다 하단배너" priority />
    </div>
  );
}

export default BottomBanner;
