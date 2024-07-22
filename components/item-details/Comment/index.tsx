import Profile from '../Profile';
import icKebab from '@/public/images/icons/ic_kebab.svg';
import { deleteItemComment, GetCommentsResponse, patchItemComment } from '@/lib/api/items';
import Image from 'next/image';
import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import SelectBox from '@/components/select-box';
import getFormatTime from '@/lib/utils/time';

type PatchComment = {
  modifiedContent: string;
  commentId: number;
  token: string | null;
};

type DeleteComment = {
  commentId: number;
  token: string | null;
};

export default function Comment({ content, createdAt, writer, itemId, id: commentId }: GetCommentsResponse) {
  const { nickname, image, id } = writer;
  let nowDate = getFormatTime(createdAt);
  const [selectBoxIsOpen, setSelectBoxIsOpen] = useState(false);
  const kebabRef = useRef<HTMLImageElement | null>(null);
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userInfo') : null;
  const [modifiedContent, setModifiedContent] = useState(content);
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setModifiedContent(value);
  };

  const modifyCommentMutation = useMutation({
    mutationFn: ({ modifiedContent, commentId, token }: PatchComment) =>
      patchItemComment(modifiedContent, commentId, token),
    onSuccess: () => {
      setIsEdit(prev => !prev);
      queryClient.invalidateQueries({ queryKey: ['item', itemId, 'comments'] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId, token }: DeleteComment) => deleteItemComment(commentId, token),
    onSuccess: () => {
      setIsEdit(prev => !prev);
      queryClient.invalidateQueries({ queryKey: ['item', itemId, 'comments'] });
    },
  });

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    modifyCommentMutation.mutate({ modifiedContent, commentId, token });
  };

  const handleDelete = async () => {
    deleteCommentMutation.mutate({ commentId, token });
  };

  const dropdownList = [
    { label: '수정하기', onClick: () => setIsEdit(prev => !prev) },
    {
      label: '삭제하기',
      onClick: () => {
        handleDelete();
      },
    },
  ];
  return (
    <div className='flex flex-col gap-[24px] text-[16px] text-[#1f2937] relative'>
      <div className='flex justify-between'>
        {!isEdit && <p>{content}</p>}
        {isEdit && (
          <div className='flex-1 flex justify-between gap-[4px] p-[4px] mt-[4px] border border-gray-200 rounded-md selection:rounded-md focus:border-brand-blue'>
            <textarea
              onChange={handleChange}
              id='modifiedContent'
              value={modifiedContent}
              className='flex-1 w-full p-[6px] rounded-md resize-none text-[12px] placeholder:text-gray-300 focus:outline-none'
            />
            <button
              disabled={modifiedContent.length < 1}
              className='relative border right-[2px] top-[18px] h-[28px] w-[84px] rounded-[4px] text-[12px] text-brand-blue disabled:text-gray-400'
              type='submit'
              onClick={e => {
                handleSubmit(e);
              }}>
              수정
            </button>
          </div>
        )}
        <div className=' w-[24px] h-[24px]'>
          {id.toString() === userId ? (
            <>
              <Image
                ref={kebabRef}
                className='cursor-pointer'
                src={icKebab}
                width={24}
                alt='케밥 메뉴'
                onClick={() => setSelectBoxIsOpen(prev => !prev)}
              />
              {selectBoxIsOpen && (
                <span className='absolute top-7 right-2 md:top-4 lg:top-4'>
                  <SelectBox items={dropdownList} setSelectBoxIsOpen={setSelectBoxIsOpen} exceptions={[kebabRef]} />
                </span>
              )}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <Profile image={image} nickname={nickname}>
        <span className='text-[#9ca3af] text-[12px]'>{nowDate}</span>
      </Profile>
      <div className='w-full h-[1px] bg-[#e5e7eb] mb-[16px]'></div>
    </div>
  );
}
