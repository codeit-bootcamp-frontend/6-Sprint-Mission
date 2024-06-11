import Image from "next/image";
import { useCallback, useState } from "react";
import { postArticleLike } from "../api";

interface Props {
  width: number;
  height: number;
  id: number;
  className: string;
  likeCount: number;
}

export function LikeCount({ width, className, likeCount, height, id }: Props) {
  const [like, setLike] = useState(likeCount);
  const handleClick = () => {
    (async () => {
      const data = await postArticleLike(id);
    })();
  };
  return (
    <figure className={className}>
      <Image
        src="/icons/heart.png"
        height={height}
        width={width}
        alt="like Icon"
        className="hover:cursor-pointer"
        onClick={handleClick}
      />
      <span className="text-[#9ca3af]">{like > 9999 ? "9999+" : like}</span>
    </figure>
  );
}
