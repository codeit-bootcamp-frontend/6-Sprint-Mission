import { useState } from "react";

function CommentItem({ item }) {
  return (
    <div className="comment-item">
      <p>{item.content}</p>
      <div className="user-info">
        <img src={item.writer.image} alt="유저 썸네일" />
        <div className="user-name">
          <p>{item.writer.nickname}</p>
          <span>{item.updatedAt}</span>
        </div>
      </div>
    </div>
  );
}

function ProductDetailComment({ comments }) {
  const [inquiry, setinquiry] = useState("");
  const handleInputChange = (e) => {
    setinquiry(e.target.value);
  };
  const abledButton = () => {
    //등록 버튼 활성화
    if (inquiry) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="detail-comment">
      <div className="detail-inquiry">
        <p>문의하기</p>
        <textarea
          onChange={handleInputChange}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        ></textarea>
        <button disabled={!abledButton()}>등록</button>
      </div>
      <div className="comment-area">
        {comments.length === 0 ? (
          <div className="empty-comment">
            <p>등록된 댓글이 없습니다.</p>
          </div>
        ) : (
          comments?.map((item) => <CommentItem key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

export default ProductDetailComment;
