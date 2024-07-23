import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import { ReplyList } from "@/components/ReplyList";
import Header from "@/components/Header";
import icoKebab from "@/src/img/ic_kebab.svg";
import icoBack from "@/src/img/ic_back.svg";
import { GetServerSidePropsContext } from "next";
import { deleteLike, getArticleComments, getArticleDetail, postArticleComment, postLike } from "@/src/api/api";
import WriterInfo from "@/components/WriterInfo";
import icoHeart from "@/src/img/ic_heart.svg";
import icoHeartOn from "@/src/img/ic_heart_on.svg";
import { ChangeEvent, FormEvent, FormEventHandler, useRef, useState } from "react";
import { useRouter } from "next/router";
import ImgReplyEmpty from "@/src/img/Img_reply_empty.png";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let article;
  let comments;
  try {
    const articleRes = await getArticleDetail(String(id));
    const commentRes = await getArticleComments(String(id));
    article = articleRes ?? [];
    comments = commentRes ?? [];
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      article,
      comments,
    },
  };
}

export default function ItemDetailPage({ article, comments }: { article: any; comments: any }) {
  const [like, setLike] = useState(false);
  // TODO: isLiked API 추가 가능한지 문의함
  const [likeTotal, setLikeTotal] = useState<number>(article.likeCount);
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleLike = async(e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked) {
      await postLike(article.id);
      setLikeTotal((prevNum) => prevNum + 1);  
      setLike(true);
    } else {
      await deleteLike(article.id);  
      setLikeTotal((prevNum) => prevNum - 1);  
      setLike(false);
    } 
  }

  const handleReplySubmit = async(e:FormEvent) => {
    e.preventDefault();
    
    const response = await postArticleComment(article.id, {content: comment});
    if(!response) return;

    setComment("");
    router.reload();
  }

  return (
    <>
      <Header />
      <div className="section-wrap">
        <section className="section-detail">
          <div className="section-content">
            <div className="section-row">
              <div>
                <h2 className="section-tit">
                  <span className="detail-tit">{article.title}</span>
                  <button type="button" className="btn-more">
                    <Image width="24" height="24" src={icoKebab} alt="더보기" />
                  </button>
                </h2>
              </div>
              <div>
                <ul className="info-list">
                  <li>
                    <WriterInfo article={article} />
                  </li>
                  <li>
                    <span className="like">
                      <input type="checkbox" id="chk_like" className="chk_like" onChange={handleLike} />
                      <label htmlFor="chk_like" className="lab_like">
                        <Image width="24" height="24" src={like ? icoHeartOn : icoHeart} alt="좋아요 수" />
                      </label>
                      <em className="count">{likeTotal}</em>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <hr className="line" />
        <section className="section-article-content">
          <div>{article.content}</div>
          {article.image && (
            <figure>
              <Image width="72" height="72" src={article.image} alt="이미지" className="content-img" />
            </figure>
          )}
        </section>
        <section className="section-comment">
          <h3 className="section-tit">댓글 달기</h3>
          <form onSubmit={handleReplySubmit}>
            <div className="section-content">
              <Input.Textarea name="comment" value={comment} className="input-theme txt-comment" placeholder="댓글을 입력해주세요." onChange={handleChange} />
              <Button type="submit" id="submit-comment" size="small" className="btn-comment" disabled={comment === ""}>
                등록
              </Button>
            </div>
          </form>
        </section>
        <section className="section-replyList">
          <ReplyList items={comments} />
          {comments.length === 0 && 
            <div className="no-reply">
              <Image src={ImgReplyEmpty} width={140} height={140} alt="댓글 이미지"/>
              <p>아직 댓글이 없어요.</p>
              <p>지금 댓글을 달아보세요!</p>
            </div>}
        </section>
        <section className="section-btn">
          <Link href="/boards" className="btn-list">
            <span>목록으로 돌아가기</span>
            <Image width="24" height="24" src={icoBack} aria-hidden="true" alt="아이콘" />
          </Link>
        </section>
      </div>
    </>
  );
}
