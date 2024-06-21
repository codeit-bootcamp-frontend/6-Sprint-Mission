import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { ArticleType } from "@/types/type";
import type { ArticleComment } from "@/types/type";
import Comment from "@/components/Addboards/Comment";
import ArticleDetails from "@/components/Addboards/ArticleDetails";
import styled from "styled-components";
import InputItem from "@/components/InputItem";
import Link from "next/link";
import ic_back from "@/public/icon/ic_back.svg";
import Image from "next/image";
import nonecomments from "@/public/img/img_nonecomments.svg";

export default function ArticleComment() {
  const router = useRouter();
  const { id: ArticleId } = router.query;

  const [accessToken, setAccessToken] = useState("");
  const [articleComment, setArticleComment] = useState<ArticleComment[]>([]);
  const [articleDetails, setArticleDetails] = useState<ArticleType | null>(
    null
  );
  const [comment, setComment] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    const getArticleComment = async () => {
      if (!ArticleId) return;
      try {
        const res = await axios.get(`articles/${ArticleId}/comments?limit=999`);
        setArticleComment(res.data.list);
      } catch (error) {
        console.error(error);
      }
    };

    getArticleComment();
  }, [ArticleId]);

  useEffect(() => {
    const getArticleDetails = async () => {
      if (!ArticleId) return;
      try {
        const res = await axios.get(`articles/${ArticleId}`);
        setArticleDetails(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getArticleDetails();
  }, [ArticleId]);

  const postComment = async () => {
    if (!ArticleId || !comment) return;
    try {
      const res = await axios.post(
        `/articles/${ArticleId}/comments`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        alert("댓글이 성공적으로 작성되었습니다.");
        setArticleComment((prevComments) => [res.data, ...prevComments]);
        setComment("");
      }
    } catch (e) {
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postComment();
  };

  return (
    <>
      <Container>
        {articleDetails && <ArticleDetails details={articleDetails} />}
        <form onSubmit={handleSubmit}>
          <InputItem
            id="description"
            label="댓글 달기"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력해주세요."
            isTextArea
          />
          <SubmitContainer>
            <SubmitButton type="submit" disabled={!comment}>
              등록
            </SubmitButton>
          </SubmitContainer>
        </form>
        {articleComment.length > 0 ? (
          articleComment.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <BackButtonContainer>
            <Image
              src={nonecomments}
              alt="댓글이 없습니다!"
              width={150}
              height={196}
            ></Image>
          </BackButtonContainer>
        )}
        <BackButtonContainer>
          <Link href="/boards">
            <BackButton>
              목록으로 돌아가기
              <Image
                src={ic_back}
                alt="뒤로 가기"
                width={24}
                height={24}
              ></Image>
            </BackButton>
          </Link>
        </BackButtonContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 1236px;
  padding: 0 18px;
  width: 100%;
  margin: 32px auto 60px auto;
`;

const SubmitButton = styled.button`
  background-color: #3692ff;
  color: #fff;
  padding: 11.5px 23px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-right: auto;

  &:hover {
    background-color: #1967d6;
  }

  &:focus {
    background-color: #1251aa;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: default;
    pointer-events: none;
  }
`;

const SubmitContainer = styled.div`
  margin: 10px 0px;
  text-align: right;
`;

const BackButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 48px;
  border-radius: 40px;
  background: #3692ff;
  border: none;
  color: #fff;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
`;
