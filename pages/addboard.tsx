import AddBoardContainer from '@/src/components/AddBoardContainer';
import React from 'react';
import style from '@/styles/AddBoardFrame.module.css';
const addboard = () => {
  return (
    <div className={style.addBoardFrame}>
      <AddBoardContainer />
    </div>
  );
};

export default addboard;

