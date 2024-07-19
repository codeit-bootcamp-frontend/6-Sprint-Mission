import { css } from "@/styled-system/css";
import { hstack } from "@/styled-system/patterns";
import pandaLogoIcon from "@/assets/icons/panda-logo.svg";
import Image from "next/image";
import Link from "next/link";

function HeaderSign() {
  return (
    <Link href="./" className={hstack({ justify: "center", gap: "22px" })}>
      <Image
        src={pandaLogoIcon}
        alt="판다얼굴 로고"
        className={css({
          w: { base: "52px", md: "104px" },
          h: { base: "52px", md: "104px" },
        })}
      />
      <h1
        className={css({
          color: "blueBasic",
          fontSize: { base: "33px", md: "66px" },
          lineHeight: { base: "45px", md: "90px" },
          fontWeight: "bold",
        })}
      >
        판다마켓
      </h1>
    </Link>
  );
}

export default HeaderSign;
