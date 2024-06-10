import React, { useEffect, useState } from "react";
import { getArticleById, postArticleComment, testLogin } from "../api/api";
import { useRouter } from "next/router";
import { Post } from "@/types/articleResponseTypes";
import Profile from "../../public/assets/ui/ic_profile.svg";
import Heart from "../../public/assets/icon/ic_heart.svg";
import Back from "../../public/assets/icon/ic_back.svg";
import { formatDate } from "../../utils/utils";
import { GetServerSideProps } from "next";
import Layout from "@/components/UI/Layout";
import AddComment from "./components/AddComment";
import CommentList from "./components/CommentList";
import Link from "next/link";
import { SignInResponse } from "@/types/authenticationTypes";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const initialPost = await getArticleById(id);
  if (!initialPost) {
    return {
      notFound: true,
    };
  }

  let { accessToken }: SignInResponse = await testLogin();
  if (!accessToken) {
    accessToken = "";
  }
  return {
    props: { initialPost, accessToken },
  };
};

interface PostContentProps {
  initialPost: Post;
  accessToken: string;
}

const PostContent = ({ initialPost, accessToken }: PostContentProps) => {
  const [post, setPost] = useState<Post>(initialPost);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState({ content: "" });
  const router = useRouter();
  const { id } = router.query;

  let stringId = "";
  if (Array.isArray(id)) {
    stringId = id[0];
  } else if (typeof id === "string") {
    stringId = id;
  } else {
    throw new Error("id is not string");
  }

  useEffect(() => {
    async function fetchArticle() {
      if (id) {
        try {
          const response = await getArticleById(stringId);
          if (!response) {
            throw new Error("게시물을 찾을 수 없습니다");
          }
          setPost(response);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("알 수 없는 오류 발생");
          }
        }
      }
    }
    fetchArticle();
  }, [id]);

  let date = "";
  if (post?.createdAt) {
    const dateObject = new Date(post.createdAt);
    date = formatDate(dateObject);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.content === "") {
      return;
    }
    await postArticleComment(stringId, comment, accessToken);
    setComment((prevComment) => ({ ...prevComment, content: "" }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    setComment({ content: inputText });
  };

  return (
    <Layout>
      <div className="mb-[64px] flex flex-col gap-[16px] pt-[33px]">
        <div className="flex flex-col gap-[16px]">
          <div className="text-[20px] font-bold text-gray-800">
            {post?.title}
          </div>
          <div className="flex h-[24px]">
            <div className="flex items-center gap-[8px] pr-[16px]">
              <Profile width="24" height="24" />
              <div className="text-[14px] font-normal text-gray-600">
                {post?.writer.nickname}
              </div>
              <div className="text-[12px] font-normal text-gray-400">
                {date}
              </div>
            </div>
            <div className="flex items-center gap-[6px] border-l border-l-gray-200 pl-[16px]">
              <Heart width="20" height="17" viewBox="-2 -1 20 17" />
              <div className="text-[14px] font-normal text-gray-500">
                {post?.likeCount}
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="text-[16px] font-normal text-gray-800">
          {post?.content}
        </div>
      </div>
      <AddComment
        currentId={id}
        accessToken={accessToken}
        comment={comment}
        onTextAreaChange={handleTextAreaChange}
        onSubmit={handleSubmit}
      />
      <CommentList currentId={id} comment={comment} />
      <div className="mt-[40px] flex justify-center">
        <Link
          href="/boards/"
          className="rounded-[40px] bg-blue px-[71px] py-[12px] text-center text-white"
        >
          <div className="flex items-center gap-[10px]">
            <div>목록으로 돌아가기</div>
            <Back width="24" height="24" />
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default PostContent;
