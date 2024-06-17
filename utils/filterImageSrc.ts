import { IMAGE_DOMAIN_ALLOWED } from "@/constants/boards";

export default function filterImageSrc(image: string | null) {
  if (image?.startsWith(IMAGE_DOMAIN_ALLOWED)) {
    return image;
  } else {
    return "";
  }
}
