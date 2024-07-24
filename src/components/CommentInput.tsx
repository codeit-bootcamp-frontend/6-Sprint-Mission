import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import axiosInstance from '../api/apiClient';

type Inputs = {
  comment: string;
};

export default function CommentInput({ productId }: { productId: number }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>();

  const mutationComment = useMutation({
    mutationFn: (comment: string) =>
      axiosInstance.post(`/products/${productId}/comments`, {
        content: comment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutationComment.mutate(data.comment);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-6 flex flex-col">
      <label htmlFor="comment" className="font-semibold">
        문의하기
      </label>
      <textarea
        {...register('comment', { required: true })}
        className="mt-4 w-full resize-none rounded-xl bg-[var(--cool-gray100)] px-6 py-4"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />

      <input
        type="submit"
        className={`ml-auto mt-4 cursor-pointer rounded-lg bg-[var(--btn-blue1)] px-7 py-3 text-white ${!isValid && 'bg-[var(--cool-gray400)]'}`}
      />
    </form>
  );
}
