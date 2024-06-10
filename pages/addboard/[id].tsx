import { useState, useEffect, useRef, FormEvent, MouseEvent } from "react";
import { GetServerSidePropsContext } from 'next';
import { useRouter } from "next/router";
import { axiosRequester } from "lib/axios";
import useAxiosFetch from "hooks/useAxiosFetch";
import DetailArticle from "components/DetailArticle";
import Comment from "components/Comment";
import { RectangleButton, RoundButton } from "components/Button";
import Back from "public/icon/ic_back.svg";
import useInterSectionObserver from "hooks/useInterSectionObserver";
import styled from "styled-components";
import { ACCESS_TOKEN } from "utils/accessToken";
import { AxiosResponse } from 'axios';
import { Article, CommentProps, DetailArticleDataFormat, DetailArticleProps } from "types/type";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let article: Article;
  let comments: CommentProps[];
  let nextCursor: number | null;

  try {
    const articleRes: AxiosResponse<Article> = await axiosRequester({
      method: "get",
      url: `/articles/${id}`,
    });

    article = articleRes?.data;

    const commentsRes: AxiosResponse<DetailArticleDataFormat<CommentProps>> = await axiosRequester({
      method: "get",
      url: `/articles/${id}/comments`,
      params: {
        limit: 5,
      },
    });

    comments = commentsRes?.data?.list;
    nextCursor = commentsRes?.data?.nextCursor;
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
      comments,
      nextCursor,
    },
  };
}

export default function DetailArticlePage({ article, comments, nextCursor }: DetailArticleProps) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(comments);
  const [cursor, setCursor] = useState(nextCursor);
  const articlesRef = useRef(null);
  const isCommentsIntersection = useInterSectionObserver(articlesRef);
  const { isLoading, error, axiosFetch } = useAxiosFetch();
  const router = useRouter();

  const postComments = async () => {
    const res = await axiosFetch({
      method: "post",
      url: `/articles/${article.id}/comments`,
      data: {
        content: comment,
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      // withCredentials: true,
    });

    return res;
  };

  const getComments = async () => {
    const res = await axiosFetch({
      method: "get",
      url: `/articles/${article.id}/comments`,
      params: {
        limit: 5,
        cursor,
      },
    });

    return res;
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return;

    const res = await postComments();
    setCommentList((prev) => [res?.data, ...prev]);
    setComment("");
  };

  const isButtonDisabled = !comment;

  useEffect(() => {
    (async () => {
      if (!isCommentsIntersection || cursor === null) return;

      const res = await getComments();
      setCommentList((prev) => [...prev, ...res?.data?.list]);
      setCursor(res?.data?.nextCursor);
    })();
  }, [isCommentsIntersection]);

  return (
    <>
      <DetailArticle article={article} />
      <SubmitCommentContainer>
        <InputTitle>댓글</InputTitle>
        <TextArea
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <ButtonContainer>
          <RectangleButton type="submit" disabled={isButtonDisabled} onClick={handleSubmit}>
            등록
          </RectangleButton>
        </ButtonContainer>
      </SubmitCommentContainer>
      <Comment comments={commentList} />
      <div ref={articlesRef}></div>
      <BackButtonContainer onClick={() => router.push('/boards')}>
        <RoundButton type="button">
          목록으로 돌아가기
          <BackIcon width={24} height={24} />
        </RoundButton>
      </BackButtonContainer>
    </>
  );
}

const SubmitCommentContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 40px 0 16px;
`;

const InputTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 1.9rem;
`;

const TextArea = styled.textarea`
  height: 104px;
  padding: 16px 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colorPalette.inputBackgroundColor};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.colorPalette.inputPlaceholderColor};

  &::placeholder{
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.colorPalette.inputPlaceholderColor};
	}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BackButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BackIcon = styled(Back)``;
