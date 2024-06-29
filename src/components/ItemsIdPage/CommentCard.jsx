import React from "react";
import SeeMore from "../../assets/img/SeeMore.svg";
import "./CommentCard.css";

function CommentCard({ item }) {
  return (
    <div className="CardContainer">
      <div className="itemsContent">
        <p className="QuestionContent">{item.content}</p>
        <button className="SeeMoreButton">
          <img className="SeeMoreImg" src={SeeMore} />
        </button>
      </div>
      <div className="QuestionProfile">
        <img
          className="QuestionProfileImg"
          src={item.writer.image}
          alt={`${item.writer.nickname}님의 프로필 사진`}
        />
        <div>
          <div className="Username">{item.writer.nickname}</div>
          <p className="QuestionTimestamp">{item.updatedAt}</p>
        </div>
      </div>
      <div>
        <hr className="hr" />
        <p/>
      </div>
    </div>
  );
}

export default CommentCard;
