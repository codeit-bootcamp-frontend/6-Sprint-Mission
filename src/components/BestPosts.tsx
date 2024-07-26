import { useEffect, useState } from "react";
import icon_medal from "../assets/icon_medal.png";
import icon_favorite from "../assets/icon_favorite.png";
import { Link } from "react-router-dom";
import { getBestPosts } from "../api/api";
import formatDate from "../utils/formatDate";
import getBestPostsPerPage from "../utils/getBestPostsPerPage";

type BestPostsData = {
  id: number;
  title: string;
  content: string;
  img?: string | null;
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

export default function BestPosts({ initialBestPosts }: BestPostsProps) {
  const [bestPosts, setBestPosts] = useState<BestPostsData[]>(initialBestPosts);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const fetchBestPosts = async () => {
      try {
        const data = await getBestPosts({ pageSize });
        setBestPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchBestPosts();
  }, [pageSize]);

  useEffect(() => {
    const handleMediaQueryChange = () => {
      const screenSize = window.innerWidth >= 1200 ? "desktop" : window.innerWidth >= 768 ? "tablet" : "mobile";
      setPageSize(getBestPostsPerPage(screenSize));
    };

    window.addEventListener("resize", handleMediaQueryChange);
    handleMediaQueryChange();

    return () => {
      window.removeEventListener("resize", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="flex items-center justify-start gap-6 lg:mx-auto">
      {bestPosts.map((post) => (
        <Link
          to={`/boards/${post.id}`}
          className="h-[169px] w-[400px] rounded-[1rem] bg-gray-50 px-8 md:w-[380px] xl:w-full"
          key={post.id}
        >
          <div className="bg-main inline-flex h-[30px] w-[102px] items-center justify-center rounded-b-[5rem]">
            <img src={icon_medal} alt="" width={16} height={16} />
            <p className="text-[16px] text-white">Best</p>
          </div>
          <div className="flex h-[80px] items-center justify-between gap-[0.3rem]">
            <h3 className="m-0 p-0 font-bold">{post.title}</h3>
            {post.img && (
              <div className="flex h-[72px] min-w-[72px] items-center justify-center rounded-[0.3rem] border-[1.5px] border-gray-100 bg-white">
                <img
                  src={post.img}
                  alt="포스트 이미지"
                  width={48}
                  height={48}
                />
              </div>
            )}
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex items-center justify-start gap-[0.2rem]">
              <p className="text-[14px] text-gray-600">{post.writer.nickname}</p>
              <img src={icon_favorite} alt="하트" width={16} height={16} />
              <p className="text-[14px] text-gray-600">{post.likeCount}</p>
            </div>
            <p className="text-[14px] text-gray-400">{formatDate(post.createdAt)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
