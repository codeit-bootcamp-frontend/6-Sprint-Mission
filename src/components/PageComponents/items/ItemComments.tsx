"use client";

import Button from "@/components/Button/Button";
import Comment from "@/components/Comment/Comment";
import CommentEmpty from "@/components/Comment/CommentEmpty";
import { ITEM_COMMENT_LIMIT } from "@/constants/pageLimit";
import { getProductComments } from "@/lib/api/comment";
import { userAtom } from "@/recoil/atoms/UserAtom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRecoilValue } from "recoil";

const ItemComments = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { user } = useRecoilValue(userAtom);

  const {
    data: commentsData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["productComments", id],
    queryFn: ({ pageParam = 0 }) =>
      getProductComments(Number(id), {
        limit: ITEM_COMMENT_LIMIT,
        cursor: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  if (isLoading) return <div>Loading comments...</div>;
  if (isError) return <div>Error loading comments</div>;
  if (commentsData?.pages[0]?.list?.length === 0) return <CommentEmpty />;

  return (
    <>
      {commentsData?.pages.map((page) =>
        page.list.map((comment: Comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            isUserComment={(user && comment.writer.id === +user.id) || false}
          />
        )),
      )}

      <Button
        className="mx-auto h-42 w-88 rounded-8 border-1 border-gray-400 text-gray-600"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading more..." : "더보기"}
      </Button>
    </>
  );
};

export default ItemComments;
