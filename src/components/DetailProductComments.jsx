import commentsNullImage from "../assets/detail-comments-null.png";
import backButtonIcon from "../assets/detail-back-button.png";
import { useState } from "react";
import "./DetailProductComments.css";

function DetailProductComments({
  handleOnClick,
  comments,
  userDate,
  onCreate,
}) {
  const [content, setContent] = useState("");

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    onCreate(content);
    setContent("");
  };
  return (
    <section className='detail-section-bottom'>
      <form className='detail-user-qna-form'>
        <div className='user-qna-input-wrap'>
          <label className='user-qna-label' htmlFor='user-qna'>
            문의하기
          </label>
          <div className='user-qna-input-background'>
            <input
              className='user-qna-input'
              value={content}
              onChange={onChangeContent}
              id='user-qna'
              type='text'
              placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
            />
          </div>
        </div>
        <div className='user-qna-button-wrap'>
          <button
            className='user-qna-button'
            style={{ backgroundColor: content ? "#3692FF" : "#9ca3af" }}
            type='button'
            onClick={onSubmit}
          >
            등록
          </button>
        </div>
      </form>
      <div className='detail-user-comments'>
        {comments.length !== 0 ? (
          <ul className='user-comments-list'>
            {comments.map((item) => (
              <li key={item.id} className='user-comment'>
                <h3 className='user-text'>{item.content}</h3>
                <div className='user-profile'>
                  <div className='user-profile-img-wrap'>
                    <img
                      className='user-profile-img'
                      src={item.writer.image}
                      alt='유저 이미지'
                    />
                  </div>
                  <div className='user-info'>
                    <div className='user-info-wrap'>
                      <p className='user-name'>{item.writer.nickname}</p>
                      <span className='user-time'>
                        {userDate(item.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='user-comments-null'>
            <img
              className='comments-null-img'
              src={commentsNullImage}
              alt='문의 없음 이미지'
            />
          </div>
        )}

        <div className='user-comments-button-wrap'>
          <button
            onClick={() => handleOnClick()}
            className='user-comments-button'
          >
            <span className='comments-button-text'>
              목록으로 돌아가기
              <img src={backButtonIcon} alt='돌아가기 아이콘' />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default DetailProductComments;
