import React, { useEffect, useState, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { useInfiniteQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getItemsComments, GetCommentsResponse, postItemComment } from '@/lib/api/items';
import useItem from '@/hooks/useItem';
import ItemDetailCard from '@/components/item-details/ItemDetailCard';
import Comment from '@/components/item-details/Comment';
import icBack from '@/public/images/icons/ic_back.svg';
import Img_inquiry_empty from '@/public/images/image_inquiry_empty.png';
import { useRouter } from 'next/router';
import Image from 'next/image';

type GetCommentListResponse = {
  nextCursor: number;
  list: GetCommentsResponse[];
};

const COMMENT_LIMIT = 3;

export default function ItemDetails() {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const router = useRouter();
  const { id: itemId } = router.query as { id?: string };
  const item = useItem(itemId ? parseInt(itemId) : undefined);
  const [inquiryComment, setInquiryComment] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery<GetCommentListResponse>({
    queryKey: ['item', itemId, 'comments'],
    queryFn: ({ pageParam = null }) => getItemsComments(itemId, pageParam as number | null, COMMENT_LIMIT),
    getNextPageParam: lastPage => lastPage.nextCursor,
  });

  const createCommentMutation = useMutation({
    mutationFn: ({ inquiryComment, itemId, token }: PostComment) => postItemComment(inquiryComment, itemId, token),
    onSuccess: () => {
      setInquiryComment('');
      queryClient.invalidateQueries({ queryKey: ['item', itemId, 'comments'] });
    },
  });

  const handleGoBack = () => {
    router.push('/items');
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInquiryComment(e.target.value);
  };

  const isFormComplete = inquiryComment.trim() !== '';

  const buttonStyle = isFormComplete ? 'bg-[#3692FF]' : 'bg-[#9CA3AF]';

  if (!item) {
    return <div>데이터 로딩중...</div>;
  }

  type PostComment = {
    inquiryComment: string;
    itemId: string | undefined;
    token: string | null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentMutation.mutate({ inquiryComment, itemId, token });
  };

  const preventDefault = (e: KeyboardEvent<HTMLFormElement>) => {
    e.key === 'Enter' && e.preventDefault();
  };

  return (
    <div className='w-[343px] mx-auto pb-[121px] md:w-[696px] lg:w-[1200px]'>
      <ItemDetailCard itemDetail={item} id={itemId} />
      <div className='w-full h-[1px] bg-[#e5e7eb] my-[8px] md:mb-[16px] lg:mb-[24px]' />
      <form
        action='submit'
        onSubmit={handleSubmit}
        onKeyDown={preventDefault}
        className='flex flex-col items-end gap-[16px] pb-[16px] md:pb-[24px]'>
        <label htmlFor='comment' className='w-full flex flex-col gap-[12px]'>
          문의하기
          <textarea
            id='comment'
            value={inquiryComment}
            onChange={handleChange}
            placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
            className='box-border bg-[#f3f4f6] w-full h-[104px] p-[16px_24px] border-0 rounded-[12px] text-[16px] font-[400] resize-none placeholder:text-[#9ca3af] placeholder:text-[14px] placeholder:font-[400] placeholder:leading-[24px] placeholder:tracking-[-1px] md:w-[696px] md:placeholder:text-[16px] lg:w-[1200px]'
          />
        </label>
        <button
          type='submit'
          disabled={!isFormComplete}
          className={`max-w-[71px] p-[12px_23px] ${buttonStyle} rounded-[8px] text-white font-[600] text-[14px] leading-[16px]`}>
          등록
        </button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading comments</div>
      ) : (
        <>
          {data.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.list.length === 0 && index === 0 ? (
                <div className='flex flex-col items-center'>
                  <div className='w-[200px] h-[200px]'>
                    <Image
                      width={200}
                      height={200}
                      src={Img_inquiry_empty}
                      alt='회색 판다 그림'
                      className='w-full h-full'
                    />
                  </div>
                  <p className='font-[400] text-[16px] text-[#9ca3af] leading-[24px]'>아직 문의가 없습니다.</p>
                </div>
              ) : (
                page.list.map((comment: GetCommentsResponse) => (
                  <Comment key={comment.id} {...comment} itemId={itemId} />
                ))
              )}
            </React.Fragment>
          ))}
          {hasNextPage && (
            <button onClick={() => fetchNextPage()} className='h-10 mt-4 text-white rounded-md min-w-28 bg-brand-blue'>
              댓글 더보기
            </button>
          )}
        </>
      )}
      <button
        onClick={handleGoBack}
        className='box-border min-w-[240px] p-[12px_40px] bg-[#3692FF] rounded-[40px] text-white font-[600] text-[18px] leading-[16px] mx-auto mt-[24px] flex items-center gap-[10px] md:mt-[24px]'>
        <p className='text-white'>목록으로 돌아가기</p>
        <Image src={icBack} alt='뒤로 돌아가기' />
      </button>
    </div>
  );
}
