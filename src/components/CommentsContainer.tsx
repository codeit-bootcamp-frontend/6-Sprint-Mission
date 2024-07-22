import React from 'react';
import NoInquiry from './NoInquiry';
import Comments from './Comments';
import '../style/BackButton.css';
import backImage from '../img/backImage.png';
import { Link } from 'react-router-dom';
import { inquiryType } from '../api/type';

const CommentsContainer = ({ inquiries }: { inquiries: inquiryType[] }) => {
  if (inquiries.length === 0) {
    return <NoInquiry />;
  }
  return (
    <div>
      {inquiries.map((element) => (
        <Comments key={element.id} element={element} />
      ))}

      <div className='backBtnContainer'>
        <Link className='backBtnContainer-btn' to={'/items'}>
          목록으로 돌아가기
          <img
            className='backBtnContainer-image'
            src={backImage}
            alt='뒤로가기'
          />
        </Link>
      </div>
    </div>
  );
};

export default CommentsContainer;

