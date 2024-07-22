import React, { ChangeEvent, useRef, useState } from 'react';
import { getCreatedTime } from '../util/getCreatedTime';
import { inquiryType } from '../api/type';
import moreBtn from '../img/moreBtn.png';
import '../style/Comments.css';

const Comments = ({ element }: { element: inquiryType }) => {
  const { day, hours } = getCreatedTime(element);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const meatBallButtonHandler = () => {
    setIsOpen(true);
  };

  const cancelButtonHandler = () => {
    setIsOpen(false);
  };

  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.value = e.target.value;
    }
  };

  return isOpen ? (
    <div className='editContainer'>
      <input
        className='editInput'
        ref={inputRef}
        defaultValue={element.content}
        onChange={onChangeEditHandler}
      />
      <div className='editorInformation'>
        <div className='commentContainer-profile'>
          <img src={element.writer.image} alt='프로필이미지' />
          <div className='commentContainer-info'>
            <p>{element.writer.nickname}</p>
            <p>
              {day}일{hours}시간
            </p>
          </div>
        </div>
        <div className='buttonContainer'>
          <button className='cancelBtn' onClick={cancelButtonHandler}>
            취소
          </button>
          <button className='editBtn'>수정완료</button>
        </div>
      </div>
    </div>
  ) : (
    <div className='commentContainer'>
      <p className='commentContainer-comment'>{element.content}</p>
      <div className='commentContainer__frame'>
        <div className='commentContainer-profile'>
          <img src={element.writer.image} alt='프로필이미지' />
          <div className='commentContainer-info'>
            <p>{element.writer.nickname}</p>
            <p>
              {day}일{hours}시간
            </p>
          </div>
        </div>
        <button
          className='commentContainer__frame_btn'
          onClick={meatBallButtonHandler}
        >
          <img
            className='commentContainer__frame_btn--img '
            src={moreBtn}
            alt='미트볼'
          />
        </button>
      </div>
    </div>
  );
};

export default Comments;

