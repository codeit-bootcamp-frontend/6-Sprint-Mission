import React from 'react';
import noComment from '../img/noComment.png';
import '../style/NoComment.css';

const NoInquiry = () => {
  return (
    <div className='noComment'>
      <img className='noComment-image' src={noComment} alt='문의 없음' />
      <p className='noComment-p'>아직 문의가 없습니다.</p>
    </div>
  );
};

export default NoInquiry;

