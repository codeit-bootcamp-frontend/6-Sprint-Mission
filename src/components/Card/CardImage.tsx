import Image from "next/image";
import { EMPTY_POST_IMAGE } from "@/constants/defaultImages";

interface ItemCardImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ItemCardImage = ({ src, alt, className }: ItemCardImageProps) => {
  const verifiedImageSrc =
    typeof src !== "string"
      ? EMPTY_POST_IMAGE
      : src.startsWith(
            "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
          )
        ? src
        : EMPTY_POST_IMAGE;

  return (
    <div
      className={`pb-full relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: "1 / 1" }}
    >
      <Image
        src={verifiedImageSrc}
        alt={alt}
        fill
        sizes="100 100"
        className="object-cover"
      />
    </div>
  );
};

export default ItemCardImage;
