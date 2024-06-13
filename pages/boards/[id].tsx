import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getBoardById, getBoardComments, postBoardComment } from '@/apis/board';

import BackButton from '@/components/BackButton';
import Comment from '@/components/Comment';
import CommentForm from '@/components/CommentForm';

import { formatDateToYYYYMMDD } from '@/utils/formatDateToString';

import { BoardComment, BoardWithLiked } from '@/types/board';

export default function BoardItem() {
  const [board, setBoard] = useState<BoardWithLiked | undefined>();
  const [comments, setComments] = useState<BoardComment[] | undefined>();

  const { isReady, query } = useRouter();
  const id = Number(query.id);

  const handleCommentFormSubmit = async (inputValue: string) => {
    try {
      await postBoardComment(id, inputValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isReady) return;

    const loadBoardData = async (boardId: number) => {
      const boardData: BoardWithLiked = await getBoardById(boardId);
      setBoard(boardData);
    };

    const loadCommentsData = async (boardId: number) => {
      const CommentsData: BoardComment[] = await getBoardComments(boardId);
      setComments(CommentsData);
    };

    loadBoardData(id);
    loadCommentsData(id);
  }, [isReady]);

  if (!board) return;

  return (
    <>
      <BoardDetail board={board} />
      <hr className="my-4 text-gray-200 tablet:my-6 desktop:my-8" />
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold text-gray-800">댓글 달기</h3>
        <CommentForm
          placeholder="댓글을 입력해주세요."
          onSubmit={handleCommentFormSubmit}
        />
      </div>
      <div className="mt-5">
        {comments !== undefined && comments.length < 1 ? (
          <EmptyComment />
        ) : (
          <ul className="flex flex-col">
            {comments?.map((comment, index) => (
              <li key={comment.id}>
                <Comment comment={comment} />
                {index !== comments.length - 1 && (
                  <hr className="border-gray-200" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-10 flex justify-center">
        <BackButton to="/boards" />
      </div>
    </>
  );
}

type BoardDetailProp = {
  board: BoardWithLiked;
};

function BoardDetail({ board }: BoardDetailProp) {
  const { title, content, createdAt, isLiked, likeCount, writer } = board;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col gap-4 border-b">
        <Image
          src="/images/ic_kebab.svg"
          width={24}
          height={24}
          className="absolute right-0 top-0"
          alt="게시글 메뉴 아이콘"
        />
        <h3 className="pr-8 text-xl font-bold text-gray-800">{title}</h3>
        <div className="mb-4 flex">
          <div className="flex items-center gap-2 pr-4">
            <Image
              src="/images/img_default_profile.svg"
              width={24}
              height={24}
              alt="글쓴이 프로필 이미지"
            />
            <p className="text-sm font-normal text-gray-600">
              {writer.nickname}
            </p>
            <p className="text-xs font-normal text-gray-400">
              {formatDateToYYYYMMDD(new Date(createdAt))}
            </p>
          </div>
          <div className="flex items-center border-l pl-4">
            <Image
              src={`${isLiked ? '/images/ic_heart_full.svg' : '/images/ic_heart_empty.svg'}`}
              width={24}
              height={24}
              alt={`${isLiked ? '꽉찬 하트' : '빈 하트'}`}
            />
            <p className="ml-1 text-sm font-normal text-gray-500">
              {likeCount}
            </p>
          </div>
        </div>
      </div>
      <pre className="text-base font-normal text-gray-800">{content}</pre>
    </div>
  );
}

function EmptyComment() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/images/img_reply_empty.svg"
        width={140}
        height={140}
        alt="말풍선 아이콘"
      />
      <p className="text-base font-normal text-gray-400">아직 댓글이 없어요,</p>
      <p className="text-base font-normal text-gray-400">
        지금 댓글을 달아보세요!
      </p>
    </div>
  );
}
