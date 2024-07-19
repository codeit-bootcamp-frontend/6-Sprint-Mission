import { hstack } from "@/styled-system/patterns";
import bestArticleImage from "@/assets/images/best-article.png";
import Image from "next/image";
import heartIcon from "@/assets/icons/heart_ic.svg";
import {
  PostCardFooter,
  articleImageStyle,
  articleTextStyle,
  bestPostCardContainer,
} from "../boards.styled";
import formatDateString from "@/utils/formatDate";
import { Article } from "@/types/articles";
import Link from "next/link";

interface BestPostCardProps {
  article: Article;
}

function BestPostCard({ article }: BestPostCardProps) {
  const { image, likeCount, title, updatedAt, writer, id } = article;
  const articleDate = formatDateString(updatedAt);

  return (
    <Link className={bestPostCardContainer} href={`/boards/${id}`}>
      <Image src={bestArticleImage} alt="bestArticleMedal" />
      <div className={hstack({ alignItems: "normal" })}>
        <h2 className={articleTextStyle}>{title}</h2>
        {image && (
          <Image
            src={image}
            alt="bestArticleImage"
            className={articleImageStyle}
            width={100}
            height={100}
          />
        )}
      </div>
      <div className={PostCardFooter}>
        <p>{writer.nickname}</p>
        <div className={hstack({ gap: "4px", flexGrow: 1 })}>
          <Image src={heartIcon} alt="heartIcon" />
          <p>{likeCount}</p>
        </div>
        <p>{articleDate}</p>
      </div>
    </Link>
  );
}

export default BestPostCard;
