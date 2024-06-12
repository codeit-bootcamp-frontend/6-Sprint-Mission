import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import style from "@/styles/bestPost.module.css";
import bestBadge from "@/public/icon/img_badge.svg";
import heartImg from "@/public/icon/ic_heart.svg";
import Image from "next/image";
import timeString from "@/utils/timeString";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { ArticlesList } from "@/types";

export default function BestPost() {
  const [bestPosts, setBestPosts] = useState<ArticlesList[]>([]);

  const isTablet = useMediaQuery({
    query: `(max-width: 1024px)`,
  });

  const isMobile = useMediaQuery({
    query: `(max-width: 768px)`,
  });

  function pageSizePerSize() {
    if (isMobile) return 1;
    else if (isTablet) return 2;
    else return 3;
  }

  async function getBest() {
    const pageSize = pageSizePerSize();
    const res = await axios.get(
      `/articles?page=1&pageSize=${pageSize}&orderBy=like`
    );
    const posts = res.data.list ?? [];
    setBestPosts(posts);
  }

  useEffect(() => {
    try {
      getBest();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTablet, isMobile]);

  return (
    <>
      {bestPosts.map((item) => (
        <Link key={item.id} href={`/boards/${item.id}`}>
          <div className={style.BestContainer} >
            <div className={style.BestBadge}>
              <Image
                width={102}
                height={30}
                src={bestBadge}
                alt="베스트뱃지"
                className={style.bestBadge}
              />
            </div>
            <div className={style.BestTitle}>
              <span className={style.BestTitleText}>{item.title}</span>
              {item.image && (
                <Image width={72} height={72} alt="이미지" src={item.image} />
              )}
            </div>
            <div className={style.BestInfo}>
              <div className={style.BestInfoFirst}>
                <span className={style.Writer}>{item.writer.nickname}</span>
                <div className={style.BestInfoHeart}>
                  <Image width={16} height={16} alt="하트" src={heartImg} />
                  <span className={style.LikeCount}>{item.likeCount}</span>
                </div>
              </div>
              <div>
                <span className={style.times}>
                  {timeString(item.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}