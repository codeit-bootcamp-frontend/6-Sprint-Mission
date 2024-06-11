import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommentsCard } from "@/entities/commentsCard/ui/commentsCard";
import { getArticleWithId, getCommentWithId, postComment } from "@/shared/api";
import { BASE_URL } from "@/shared/constants/constants";
import { formatDate } from "@/shared/lib/formatDate";
import { Article, Comments } from "@/shared/model";
import { Button, SubmitButton } from "@/shared/ui/button";
import { IntersectionArea } from "@/shared/ui/IntersectionArea";
import { LikeCount } from "@/shared/ui/LikeCount";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";

export const getServerSideProps = (async (context) => {
  const { id } = context.query;

  if (typeof id !== "string") {
    return { notFound: true };
  }

  const articles = await getArticleWithId(id as unknown as string);
  const comments = await getCommentWithId(id as unknown as string, 0);
  return { props: { articles, comments } };
}) satisfies GetServerSideProps<{ articles: Article; comments: Comments }>;

export default function AddboardId({
  articles,
  comments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [cursor, setCursor] = useState<number | null>(comments.nextCursor);
  const [commentList, setCommentList] = useState(comments.list);
  const router = useRouter();
  const userCommentRef = useRef<HTMLTextAreaElement>(null);

  const handleImpression = useCallback(() => {
    (async () => {
      const response = await fetch(
        `${BASE_URL}/articles/${router.query.id}/comments?limit=10${cursor !== null ? `&&cursor=${cursor}` : ""}`,
      );
      const comments: Comments = await response.json();
      setCommentList((prev) => [...prev, ...comments.list]);
      setCursor(comments.nextCursor);
    })();
  }, [cursor, router]);

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      (async () => {
        if (userCommentRef.current == null) return;
        const data: Comments["list"][0] = await postComment(
          router.query.id as string,
          userCommentRef.current.value,
        );
        userCommentRef.current.value = "";
        setCommentList((prev) => [data, ...prev]);
      })();
    },
    [router.query.id],
  );

  return (
    <>
      <header className="mb-4 mt-6 border-b border-[#E5E7EB]">
        <h1 className="mb-4 flex justify-between">
          <p className="text-xl font-bold">{articles.title}</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                width={24}
                height={24}
                src="/images/ic_kebab.png"
                alt="kebab menu"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg border-gray">
              <DropdownMenuItem className="w-24 cursor-pointer justify-center border-b border-b-gray px-3 py-3">
                수정
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer justify-center px-3 py-3">
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </h1>
        <div className="mb-4 flex">
          <figure className="flex gap-2">
            <Image
              width={24}
              height={24}
              src="/icons/profileIcon.png"
              alt="profileIcon"
            />
            <p>{articles.writer.nickname}</p>
            <p className="border-r border-r-[#E5E7EB] pr-4 text-[#9CA3AF]">
              {formatDate(new Date(articles.createdAt))}
            </p>
          </figure>
          <LikeCount
            height={24}
            className="flex gap-1 pl-4"
            id={articles.id}
            likeCount={articles.likeCount}
            width={24}
          />
        </div>
      </header>
      <section>{articles.content}</section>
      <form className="mt-16" onSubmit={handleSubmit}>
        <h2 className="text-base font-semibold">댓글 달기</h2>
        <textarea
          name="content"
          className="mt-4 h-[104px] w-full resize-none rounded-xl bg-[#f3f4f6] px-6 py-4"
          placeholder="댓글을 입력해주세요"
          ref={userCommentRef}
        />
        <SubmitButton value="등록" className="ml-auto mt-4 px-[23px] py-3" />
      </form>
      {commentList.length > 0 ? (
        <ul className="flex flex-col">
          {commentList.map((comment) => (
            <CommentsCard
              key={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              nickname={comment.writer.nickname}
              image={comment.writer.image}
            />
          ))}
          {cursor !== null && (
            <IntersectionArea onImpression={handleImpression}>
              <div>더보기</div>
            </IntersectionArea>
          )}
        </ul>
      ) : (
        <section className="flex flex-col items-center">
          <Image
            width={140}
            height={140}
            src="/images/Img_reply_empty.png"
            alt="no Comments"
          />
          <p className="text-center">
            아직 댓글이 없어요,
            <br /> 지금 댓글을 달아보세요!
          </p>
        </section>
      )}
      <Link href="/boards" className="mt-5 flex justify-center lg:mt-10">
        <Button className="rounded-[40px] px-[38.5px] py-3">
          <p>목록으로 돌아가기</p>
          <Image
            width={24}
            height={24}
            src="/images/ic_back.png"
            alt="return button"
          />
        </Button>
      </Link>
    </>
  );
}
