"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button/Button";
import FavoriteButton from "@/components/Button/FavoriteButton";
import useDataFetch from "@/hooks/useDataFetch";
import useFavoriteButton from "@/hooks/useFavoriteButton";
import formatDate from "@/lib/utils/formatDate";
import { userAtom } from "@/recoil/atoms/UserAtom";
import { useRecoilValue } from "recoil";

const Post = ({ initialData }: { initialData: Post }) => {
  const [data, setData] = useState<Post>(initialData);
  const [isUserPost, setIsUserPost] = useState(false);
  const { user } = useRecoilValue(userAtom);

  const router = useRouter();
  const { isLoading, axiosFetcher } = useDataFetch();

  const {
    title,
    writer,
    id,
    likeCount,
    isLiked = false,
    content,
    createdAt,
    image,
  } = data;

  const {
    toggleFavoriteButton,
    updateFavoriteButtonState,
    isFavoriteButtonLiked,
    favoriteButtonLikeCount,
  } = useFavoriteButton("articles/id/like", isLiked, likeCount);

  const deletePost = async () => {
    const options = {
      method: "DELETE",
      url: `/articles/${id}`,
    };
    await axiosFetcher(options);
    router.replace("/boards");
  };

  // 로그인 되어있으면 게시글 like 상태를 불러오는 useEffect
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const options = {
        method: "GET",
        url: `articles/${data.id}`,
      };
      const res = await axiosFetcher(options);
      setData(res.data);
      updateFavoriteButtonState(res.data.isLiked, res.data.likeCount);
    };

    fetchData();
  }, [user, id]);

  // 본인 게시글인지 판단하는 useEffect
  useEffect(() => {
    if (user && data?.writer.id === user.id) {
      setIsUserPost(true);
    } else setIsUserPost(false);
  }, [user, data]);

  return (
    <>
      {!isLoading && (
        <>
          <div className="border-b-1 border-cool-gray-200 py-16">
            <h1 className="mb-16 text-20 font-bold leading-24 text-cool-gray-800">
              {title}
            </h1>
            <div className="flex items-center gap-8">
              <Image
                src="/images/img_default-profile.svg"
                alt="Default profile image"
                width={24}
                height={24}
              />
              <span className="mr-8 pb-2">{writer.nickname}</span>
              <span className="border-r border-cool-gray-200 pr-8 text-12 text-cool-gray-400">
                {formatDate(createdAt)}
              </span>
              <FavoriteButton
                isLiked={isFavoriteButtonLiked}
                likeCount={favoriteButtonLikeCount}
                onClick={() => toggleFavoriteButton(id)}
              />
            </div>
          </div>

          <div className="min-h-180 py-16 text-16 leading-24 text-cool-gray-800">
            {content}
            {image && (
              <Image
                src={image}
                alt="User uploaded image"
                width={140}
                height={140}
              />
            )}
          </div>

          {isUserPost && <Button onClick={deletePost}>삭제</Button>}
        </>
      )}
    </>
  );
};

export default Post;
