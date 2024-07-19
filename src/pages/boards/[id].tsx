import getArticlesId from "@/apis/article/getArticlesId";
import { ArticleId } from "@/types/articles";
import formatDateString from "@/utils/formatDate";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import userIcon from "@/assets/icons/user_passive_ic.svg";
import heartIcon from "@/assets/icons/heart_ic.svg";
import Image from "next/image";
import { hstack } from "@/styled-system/patterns";
import { css, cx } from "@/styled-system/css";
import { subTitle } from "@/css/common/text.styled";
import Comment, { CommentInp } from "@/components/shared/Comment";
import getArticlesIdComment from "@/apis/comment/getArticlesIdComment";
import backIcon from "@/assets/icons/back_ic.svg";
import { buttonRecipe } from "@/css/recipe/buttonRecipe.styled";
import Link from "next/link";
import { inputRecipe } from "@/css/recipe/inputRecipe.styled";
import noCommentImage from "@/assets/images/no-comment.png";
import Header from "@/components/shared/Header/Header";
import postArticlesComment from "@/apis/comment/postArticlesIdComment";
import { ParsedUrlQuery } from "querystring";
import { boardIdPageStyle, flexStyle } from "@/css/boardsId.styled";
import PostRefreshToken from "@/apis/auth/PostRefreshToken";
import { AccessTokenTOLocalStorage } from "@/utils/localStorageToken";

function BoardDetail() {
  const router = useRouter();
  const { id }: ParsedUrlQuery = router.query;
  const [postDetail, setPostDetail] = useState<ArticleId>();
  const [comments, setComments] = useState<CommentInp[]>([]);
  const [commentData, setCommentData] = useState("");
  const [isChangeComments, setIsChangeComments] = useState(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentData(value);
  };

  const handleSubmit = async () => {
    if (typeof id !== "string") return;
    const token = await AccessTokenTOLocalStorage();
    setCommentData("");
    await postArticlesComment(commentData, id, token);
    setIsChangeComments(!isChangeComments);
  };

  useEffect(() => {
    const loadArticlesId = async () => {
      if (id) {
        const response = await getArticlesId(id);
        setPostDetail(response);
        console.log(response);
      }
    };
    if (router.isReady) {
      loadArticlesId();
    }
  }, [id, router.isReady]);

  useEffect(() => {
    const loadComment = async () => {
      const response = await getArticlesIdComment(id);
      setComments(response.list);
    };
    if (router.isReady) {
      loadComment();
    }
  }, [isChangeComments, router.isReady]);

  const {
    content = "",
    image = null,
    likeCount = 0,
    title = "",
    updatedAt = "",
    writer = { id: 0, nickname: "" },
  } = postDetail || {};

  const postDate = formatDateString(updatedAt);
  return (
    <>
      <Header />
      <div className={boardIdPageStyle}>
        <div className={flexStyle}>
          <h1 className={subTitle}>{title}</h1>
          <div className={hstack()}>
            <Image src={userIcon} alt="유저얼굴" />
            <p>{writer.nickname}</p>
            <p>{postDate}</p>
            <div className={hstack({ borderLeft: "1px solid #DFDFDF" })}>
              <Image
                width={24}
                src={heartIcon}
                alt="하트 아이콘"
                className={css({ marginLeft: "16px" })}
              />
              <p>{likeCount}</p>
            </div>
          </div>
        </div>
        <p className={css({ minH: "80px" })}>{content}</p>
        <div className={flexStyle}>
          <label className={subTitle}>댓글 달기</label>
          <textarea
            name="comment"
            value={commentData}
            onChange={onChangeInput}
            className={inputRecipe({ visual: "large" })}
            placeholder="댓글을 입력해주세요."
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className={cx(
              buttonRecipe(
                commentData ? { visual: "small" } : { visual: "smallDisabled" }
              ),
              css({ marginLeft: "auto", cursor: "pointer" })
            )}
          >
            등록
          </button>
        </div>
        {comments && comments.length > 0 ? (
          <div className={css({ marginBottom: "24px" })}>
            {comments.map((comment) => {
              return <Comment comment={comment} key={comment.id} />;
            })}
          </div>
        ) : (
          <Image
            src={noCommentImage}
            alt="댓글이 없네요"
            className={css({ margin: "auto" })}
          />
        )}
        <Link href="../" className={buttonRecipe({ visual: "large" })}>
          목록으로 돌아가기
          <Image src={backIcon} alt="돌아가기" />
        </Link>
      </div>
    </>
  );
}

export default BoardDetail;
