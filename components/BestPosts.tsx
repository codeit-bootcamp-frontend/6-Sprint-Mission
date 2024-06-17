import { getBestPosts } from "@/api/api";
import React, { useEffect, useState } from "react";
import icon_medal from "@/public/assets/icon_medal.png";
import icon_favorite from "@/public/assets/icon_favorite.png";
import Image from "next/image";
import formatDate from "@/utils/formatDate";
import getBestPostsPerPage from "@/utils/getBestPostsPerPage";
import Link from "next/link";

type BestPostsData = {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
};

type BestPostsProps = {
  initialBestPosts: BestPostsData[];
};

export async function getStaticProps() {
  try {
    const initialBestPosts = await getBestPosts({ pageSize: 3 });
    return {
      props: {
        initialBestPosts,
      },
    };
  } catch (error) {
    console.error("posts 가져오는데 문제 발생", error);
    return {
      props: {
        initialBestPosts: [],
      },
    };
  }
}

export default function BestPosts({ initialBestPosts }: BestPostsProps) {
  const [bestPosts, setBestPosts] = useState<BestPostsData[]>(initialBestPosts);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const fetchBestPosts = async () => {
      try {
        const data = await getBestPosts({ pageSize: pageSize });
        setBestPosts(data);
      } catch (error) {
        console.error("posts 가져오는데 문제 발생", error);
      }
    };

    fetchBestPosts();
  }, [pageSize, initialBestPosts]);

  function handleMediaQueryChange() {
    const mqlDesktop = window.matchMedia("(min-width: 1200px)");
    const mqlTablet = window.matchMedia(
      "(min-width: 768px) and (max-width: 1199px)",
    );

    const screenSize = mqlDesktop.matches
      ? "desktop"
      : mqlTablet.matches
        ? "tablet"
        : "mobile";
    const bestPostsPerPage = getBestPostsPerPage(screenSize);
    setPageSize(bestPostsPerPage);

    return screenSize;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mqlDesktop = window.matchMedia("(min-width: 1200px)");
      const mqlTablet = window.matchMedia(
        "(min-width: 768px) and (max-width: 1199px)",
      );

      const mediaQueryListener = () => handleMediaQueryChange();

      mqlDesktop.addEventListener("change", mediaQueryListener);
      mqlTablet.addEventListener("change", mediaQueryListener);

      handleMediaQueryChange();

      return () => {
        mqlDesktop.removeEventListener("change", mediaQueryListener);
        mqlTablet.removeEventListener("change", mediaQueryListener);
      };
    }
  }, []);

  return (
    <div className="flex items-center justify-start gap-6 lg:mx-auto">
      {bestPosts &&
        bestPosts.map((post) => (
          <Link
            href={`/boards/${post.id}`}
            className="h-[169px] w-[400px] rounded-[1rem] bg-gray-50 px-8 md:w-[380px] xl:w-full"
            key={post.id}
          >
            <div className="bg-main inline-flex h-[30px] w-[102px] items-center justify-center rounded-b-[5rem]">
              <Image src={icon_medal} alt="" width={16} height={16} />
              <p className="text-[16px] text-white">Best</p>
            </div>
            <div className="flex h-[80px] items-center justify-between gap-[0.3rem]">
              <h3 className="m-0 p-0 font-bold">{post.title}</h3>
              {post.image && (
                <div className="flex h-[72px] min-w-[72px] items-center justify-center rounded-[0.3rem] border-[1.5px] border-gray-100 bg-white">
                  <Image
                    src={post.image}
                    alt="포스트 이미지"
                    width={48}
                    height={48}
                  />
                </div>
              )}
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div className="flex items-center justify-start gap-[0.2rem]">
                <p className="text-[14px] text-gray-600">
                  {post.writer.nickname}
                </p>
                <Image src={icon_favorite} alt="하트" width={16} height={16} />
                <p className="text-[14px] text-gray-600">{post.likeCount}</p>
              </div>
              <p className="text-[14px] text-gray-400">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
