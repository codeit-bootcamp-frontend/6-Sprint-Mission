import Image from "next/image";
import { hstack } from "@/styled-system/patterns";
import { css } from "@/styled-system/css";
import userPassiveIcon from "@/assets/icons/user_passive_ic.svg";
import heartIcon from "@/assets/icons/heart_ic.svg";
import {
  PostCardFooter,
  articleImageStyle,
  articleTextStyle,
  normalPostCardContainer,
} from "../boards.styled";
import formatDateString from "@/utils/formatDate";
import Link from "next/link";
import { Article } from "@/types/articles";

interface BestPostCardProps {
  article: Article;
}

function NormalPostCard({ article }: BestPostCardProps) {
  const { image, likeCount, title, updatedAt, writer, id } = article;
  const articleDate = formatDateString(updatedAt);

  return (
    <Link className={normalPostCardContainer} href={`/boards/${id}`}>
      <div className={hstack({ alignItems: "normal" })}>
        <h2 className={articleTextStyle}>{title}</h2>
        {image && (
          <Image
            src={image}
            alt="normalArticleImage"
            className={articleImageStyle}
            width={100}
            height={100}
          />
        )}
      </div>
      <div className={PostCardFooter}>
        <Image
          src={userPassiveIcon}
          alt="userPassiveIcon"
          className={css({ w: "24px" })}
        />
        <p>{writer.nickname}</p>
        <p className={css({ flexGrow: 1 })}>{articleDate}</p>
        <div className={hstack({ gap: "4px" })}>
          <Image src={heartIcon} alt="heartIcon" />
          <p>{likeCount}</p>
        </div>
      </div>
    </Link>
  );
}

export default NormalPostCard;
