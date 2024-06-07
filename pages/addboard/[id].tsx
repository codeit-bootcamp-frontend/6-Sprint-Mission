import BlueButton from "@/components/BlueButton";
import axios from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function UserProfile({ article = {} }) {
  return (
    <div>
      <Image
        src="/icon/profile-login-icon.png"
        alt="user profile"
        width={24}
        height={24}
        priority
      />
      <span>{article.writer?.nickname}</span>
      <span>{article.createdAt}</span>
      <span>하트</span>
      <span>{article.likeCount}</span>
    </div>
  );
}

export function ActicleItem({ article = {} }) {
  return (
    <div className="">
      <h3>{article.title}</h3>
      <UserProfile article={article} />
      <p>{article.content}</p>
    </div>
  );
}

export function CommentForm() {
  return (
    <form>
      <h4>댓글 달기</h4>
      <label htmlFor="content"></label>
      <textarea
        id="content"
        name="content"
        placeholder="댓글을 입력해주세요."
      />
      <BlueButton type="submit">등록</BlueButton>
    </form>
  );
}

export function CommentItem({ comments }) {
  return (
    <>
      <p>{comments[0]?.content}</p>
      <UserProfile />
      <Image
        src="/icon/kebab-icon.png"
        alt="kebab"
        width={24}
        height={24}
        priority
      />
    </>
  );
}

export function CommentList({ comments = [] }) {
  return (
    <>
      <CommentItem comments={comments} />
    </>
  );
}

export default function Article() {
  const router = useRouter();
  const { query } = router;
  const id = query["id"];
  const [article, setArtcle] = useState({});
  const [comments, setComments] = useState([]);

  async function getArticle(articleId) {
    if (!articleId) return;
    const res = await axios.get(`/articles/${articleId}`);
    const nextArticle = res.data;
    setArtcle(nextArticle);
  }
  async function getComments(articleId) {
    if (!articleId) return;
    const res = await axios.get(`/articles/${articleId}/comments?limit=5`);
    const nextComments = res.data.list;
    setComments(nextComments);
  }

  useEffect(() => {
    if (id) {
      getArticle(id);
      getComments(id);
    }
  }, [id]);
  return (
    <>
      <ActicleItem article={article} />
      <CommentForm />
      {!comments ? (
        <p>댓글이 없습니다.</p>
      ) : (
        <CommentList comments={comments} />
      )}
    </>
  );
}
