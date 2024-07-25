import { useEffect, useState } from "react";
import { getProductComment } from "../api/api";

export default function Comment({ productId }) {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComment() {
      try {
        setLoading(true);
        const response = await getProductComment(productId);
        console.log(response);
        if (response.list) {
          setComment(response.list);
        } else {
          setComment("댓글이 없습니다.");
        }
      } catch (err) {
        setError("댓글을 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchComment();
  }, [productId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return <div>{comment.list[0].content}</div>;
}
