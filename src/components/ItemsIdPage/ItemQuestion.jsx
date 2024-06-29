import React, { useState } from "react";
import CommentSection from "./CommentSection";
import "./ItemQuestion.css";

function ItemQuestion({ id }) {
  const [comment, setComment] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {};
  return (
    <>
      <div className="QuestionContainer">
        <p className="QuestionName">문의하기</p>
        <textarea
          className="Items_Question_textarea"
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={comment}
          onChange={handleInputChange}
        ></textarea>
        <div className="ButtonEnd">
          <button
            className="QuestionSubmit"
            onClick={handlePostComment}
            disabled={!comment.trim()}
          >
            등록
          </button>
        </div>
      </div>
      <CommentSection id={id} />
    </>
  );
}

export default ItemQuestion;
