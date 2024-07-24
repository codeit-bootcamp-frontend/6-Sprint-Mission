import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import axiosInstance from '../api/apiClient';
import useFetchComments from '../api/useFetchComments';
import { emptyCommentImage } from '../images';
import formatDateDiff from '../utils/formatDateDiff';

export default function CommentList({ productId }: { productId: number }) {
  const queryClient = useQueryClient();
  // 데이터를 가져오기 위한 옵션입니다.
  const fetchOptions = {
    productId,
    limit: 3,
  };

  // useFetchComments로 데이터를 가져옵니다.
  const { data, isLoading, isError, error } = useFetchComments(fetchOptions);
  // userId state
  const [userId, setUserId] = useState<number | null>(null);
  // 댓글 수정 state
  const [isEdit, setIsEdit] = useState(false);
  // 수정할 댓글 state
  const [content, setContent] = useState('');

  // 아이디 확인 로직
  useEffect(() => {
    const fetchUserId = async () => {
      const response = await axiosInstance.get('/users/me');
      setUserId(response.data.id);
    };
    fetchUserId();
  }, []);

  const updateComment = useMutation({
    mutationFn: (commentId: number) =>
      axiosInstance.patch(`/comments/${commentId}`, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const deleteComment = useMutation({
    mutationFn: (commentId: number) =>
      axiosInstance.delete(`/comments/${commentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    commentId: number,
  ) => {
    if (e.key === 'Enter') {
      updateComment.mutate(commentId, {
        onSuccess: () => {
          setIsEdit(false);
        },
      });
    }
  };

  const handleDelete = (commentId: number) => {
    deleteComment.mutate(commentId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error : {error.message}</div>;
  }

  return data.list.length > 0 ? (
    data?.list?.map((comment: any) => {
      return (
        <div key={comment.id}>
          <div className="my-6">
            <div className="flex justify-between">
              {isEdit && comment.writer.id === userId ? (
                <input
                  type="text"
                  className="w-full bg-[var(--cool-gray100)]"
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={(e) => handleEdit(e, comment.id)}
                  defaultValue={comment.content}
                />
              ) : (
                comment.content
              )}
              {comment.writer.id === userId && (
                <div className="flex gap-x-2">
                  <button onClick={() => setIsEdit(true)}>수정</button>
                  <button onClick={() => handleDelete(comment.id)}>삭제</button>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-x-2">
              <img
                src={comment.writer.image}
                alt="writerimage"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-sm">{comment.writer.nickname}</p>
                <p className="text-xs">
                  {formatDateDiff(comment.createdAt)}일 전
                </p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      );
    })
  ) : (
    <div className="flex flex-col items-center">
      <img src={emptyCommentImage} alt="emptyCommentImage" />
      <p className="text-[var(--cool-gray400)]">아직 문의가 없습니다</p>
    </div>
  );
}
