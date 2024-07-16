import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { getComments, postComment } from '../api/api';
import { commentType } from '../api/apiType';
import Comment from './Comment';
import CommentInput from './CommentInput';
import NoComment from './NoComment';

const CommentContainer = () => {
  const router = useRouter();
  const [comments, setComments] = useState<commentType[] | []>([]);
  const id = router.query['id'];
  const ref = useRef<HTMLInputElement>(null);

  const saveComment = async () => {
    try {
      if (typeof id === 'string') {
        const result = await getComments(id as string, 5);
        setComments(result);
      }
    } catch (error) {}
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.value = e.target.value;
    }
  };

  const registerCommentHandler = async () => {
    const content = ref.current?.value;
    try {
      await postComment(id as string, content as string);
    } catch (error) {
    } finally {
      window.location.reload();
    }
  };

  useEffect(() => {
    saveComment();
  }, []);

  return (
    <>
      <CommentInput
        ref={ref}
        registerCommentHandler={registerCommentHandler}
        onChangeHandler={onChangeHandler}
      />
      {comments.length !== 0 ? (
        comments.map((element) => (
          <Comment
            content={element.content}
            image={element.writer.image}
            createdAt={element.createdAt}
            nickName={element.writer.nickname}
          />
        ))
      ) : (
        <NoComment />
      )}
    </>
  );
};

export default CommentContainer;

