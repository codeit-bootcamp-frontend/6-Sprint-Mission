import icKebab from '@/public/images/icons/ic_kebab.svg';
import { ItemResponse } from '@/lib/api/items';
import HeartButton from '@/components/heart-button';
import SelectBox from '@/components/select-box';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import icBack from '@/public/images/icons/ic_back.svg';
import Modal from '@/components/modal';
import ModifyItemDetails from '../ModifyItemDetails';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from '@/lib/api/products';

type Props = {
  itemDetail: ItemResponse;
  id: string | undefined;
};

type DeleteProduct = {
  id: string | undefined;
  token: string | null;
};

export default function ItemDetailCard({ itemDetail, id }: Props) {
  const { name, description, images, price, tags, favoriteCount, ownerId } = itemDetail;
  const router = useRouter();
  const [selectBoxIsOpen, setSelectBoxIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleModalClose = (setter: (value: boolean) => void) => () => {
    setter(false);
  };
  const kebabRef = useRef<HTMLImageElement | null>(null);
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userInfo') : null;
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;

  const deleteProductMutation = useMutation({
    mutationFn: ({ id, token }: DeleteProduct) => deleteProduct(id, token),
    onSuccess: () => {
      setModalIsOpen(prev => !prev);
      router.push('/items');
    },
  });

  const handleDelete = async () => {
    deleteProductMutation.mutate({ id, token });
  };

  const dropdownList = [
    { label: '수정하기', onClick: () => setModalIsOpen(true) },
    {
      label: '삭제하기',
      onClick: () => {
        handleDelete();
      },
    },
  ];
  const formattedPrice = price?.toLocaleString();
  return (
    <div className='text-[#1f2937] font-[400] text-[16px] leading-[22px] box-border md:flex md:justify-center md:m-[24px] md:h-[418px] lg:h-[486px]'>
      <div className='w-[343px] h-[343px] my-[16px] md:min-w-[340px] md:h-[340px] md:my-0 lg:w-[486px] lg:h-[486px]'>
        <Image
          width={340}
          height={340}
          src={images ? images[0] : ''}
          alt={name ? name : '상품사진'}
          className='w-full h-full object-cover rounded-[12px]'
        />
      </div>
      <div className='w-[340px] relative md:ml-[16px] md:top-[3px] lg:w-[690px] lg:ml-[24px]'>
        <div className='relative flex flex-col gap-[8px] md:gap-[12px] lg:gap-[16px]'>
          <p className='font-[600] text-[16px] leading-[19px] md:text-[20px] lg:text-[24px]'>{name}</p>
          <p className='font-[600] text-[24px] leading-[19px] md:text-[32px] lg:text-[40px]'>{formattedPrice}원</p>
          {ownerId?.toString() === userId ? (
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
          <div className='w-full h-[1px] bg-[#e5e7eb] my-[8px] md:my-0 md:mb-[16px]'></div>
        </div>
        <div className='flex flex-col pb-[24px] gap-[8px]'>
          <p className='font-[500] text-[14px] leading-[19px]'>상품소개</p>
          <p>{description}</p>
        </div>
        <div className='flex flex-col gap-[8px] md:gap-[11px]'>
          <p className='font-[500] text-[14px] leading-[19px]'>상품 태그</p>
          <ul className='flex gap-[8px] flex-wrap'>
            {tags?.map(tag => <li key={tag} className='bg-[#f3f4f6] rounded-[26px] p-[6px_16px]'>{`#${tag}`}</li>)}
          </ul>
        </div>
        <HeartButton
          likeCount={favoriteCount ? favoriteCount : 0}
          toggle={false}
          isLiked={false}
          articleId={id ? id : ''}
        />
      </div>
      <Modal isOpen={modalIsOpen} onClose={handleModalClose(setModalIsOpen)}>
        <ModifyItemDetails currentData={itemDetail} />
      </Modal>
    </div>
  );
}
