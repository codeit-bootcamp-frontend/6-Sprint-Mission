import React, { useEffect, useState } from "react";
import { getProductComments } from "../../api";
import CommentCard from "./CommentCard";
import './CommentSection.css'

function CommentSection({ id }) {
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getProductComments(id);
        setComments(data.list);
        setError(null);
      } catch (error) {
        console.error("상품의 댓글을 불러오지 못했어요.");
        setError("상품의 댓글을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [id]);

  if (!id || !comments) return null;
  console.log(comments);
  return (
    <div>
      {comments.map((item) => (
        <CommentCard item={item} key={item.id} />
      ))}
    </div>
  );
}

export default CommentSection;
