import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductCommentsById } from "../../../api/itemApi";
import NoneCommentsImg from "../../../assets/images/icons/img_nonecomment.svg";
import { Comment } from "../../../types/Items";

function ItemComments() {
  const { itemId } = useParams();
  const [comments, setCommnets] = useState<Comment[]>();

  const fetch = async () => {
    try {
      const res = await getProductCommentsById(itemId);
      setCommnets(res.list);
    } catch (error) {
      console.error("상품 목록을 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  function formatTime(time: Date) {
    const elapsed = (new Date().getTime() - new Date(time).getTime()) / 1000;

    const intervals = {
      일: 86400,
      시간: 3600,
      분: 60,
      초: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
      const count = Math.floor(elapsed / seconds);
      if (count >= 1) {
        return count + unit + " 전";
      }
    }

    return "방금 전";
  }

  useEffect(() => {
    if (!itemId) return;
    fetch();
  }, []);

  return (
    <div>
      {comments && !comments.length && (
        <div className="noneCommentsContainer">
          <img src={NoneCommentsImg} alt="아직 문의가 없습니다." />
          <div>아직 문의가 없습니다.</div>
        </div>
      )}
      <ul>
        {comments &&
          comments.map((comment) => {
            return (
              <li key={comment.id}>
                <div className="commentsContainer">
                  <div className="commentsText">{comment.content}</div>
                  <div className="commentsProfile">
                    <img
                      src={comment.writer.image}
                      alt={comment.writer.nickname}
                    />
                    <div>
                      <div className="commentsName">
                        {comment.writer.nickname}
                      </div>
                      <div className="commentsAt">
                        {formatTime(comment.updatedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default ItemComments;
