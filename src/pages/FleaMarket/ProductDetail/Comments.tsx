import { useState } from 'react';
import ProductDetailAccordian from './ProductDetailAccordian';
import * as S from './Styles/CommentsStyles';
import { CommentsProps } from '../../../types';

interface Comments {
  comments: CommentsProps[];
}

function Comments({ comments }: Comments) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleModification = () => {
    // TODO
  };

  const handleDelete = () => {
    // TODO
  };

  const accordionItems = [
    { label: '수정하기', onClick: handleModification },
    { label: '삭제하기', onClick: handleDelete },
  ];

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <S.CommentUl>
      {comments?.map((comment, i) => (
        <S.CommentLi key={i}>
          <S.Comment>{comment.content}</S.Comment>
          <S.CommentContent>
            <S.CommentImg src={comment.writer.image} alt="댓글 이미지" />
            <div>
              <S.CommentName>{comment.writer.nickname}</S.CommentName>
              <S.CommentDate>{comment.createdAt}</S.CommentDate>
            </div>
            <S.SettingIcon onClick={toggleAccordion} />
            <ProductDetailAccordian items={accordionItems} isOpen={isAccordionOpen} />
          </S.CommentContent>
        </S.CommentLi>
      ))}
    </S.CommentUl>
  );
}

export default Comments;
