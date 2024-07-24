import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../api/apiClient';
import { closeTagIcon, deletePreviewImageIcon } from '../images';

// form내 에러메시지를 객체로 관리하였습니다.
const formErrorMessage = {
  required: '필수 입력 항목입니다',
  pattern: {
    number: '숫자만 입력해주세요',
  },
};

export default function ProductForm() {
  const queryClient = useQueryClient();
  // 폼 완료 후 페이지 이동
  const navigate = useNavigate();

  // 태그에 관한 state입니다.
  const [tagState, setTagState] = useState<{
    tags: string[];
    tagInput: string;
  }>({
    tags: [],
    tagInput: '',
  });
  // 미리보기 이미지를 위한 state입니다.
  const [previewImage, setPreviewImage] = useState<any | null>(null);
  // 이미지 업로드를 위한 state입니다
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  // react-hook-form으로 form의 유효성 체크 및 에러 관리를 하였습니다.
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  // 태그를 위한 함수입니다.
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagState({ ...tagState, tagInput: e.target.value });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagState.tagInput.trim() !== '') {
      e.preventDefault();
      setTagState({
        // TODO : 추후 tags set으로 migration 필요
        tags: Array.from(new Set([...tagState.tags, tagState.tagInput])),
        tagInput: '',
      });
    }
  };

  const handleRemoveTag = (idx: number) => {
    setTagState({
      ...tagState,
      tags: tagState.tags.filter((_, i) => i !== idx),
    });
  };

  // FileReader를 사용하여 미리보기 이미지를 보여주는 함수입니다.
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageUpload(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const createImage = useMutation({
    mutationFn: async (image: FormData) => {
      const response = await axiosInstance.post('/images/upload', image);
      return response.data.url;
    },
  });

  const createProduct = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post(
        '/products',
        {
          images: [data.image],
          tags: data.tags,
          price: +data.price,
          name: data.productName,
          description: data.productIntro,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      /*
       * TODO : 쿼리 키 문제로 추정되는데 products는 따로 제품 키 마다 관리가 되지 않고 있어 상세 페이지로 이동이 불가능 하는 것 같다. (페이지 이동은 되나 undefined오류가 뜸.)
       *        useFetchItems를 리팩토링 후 상세페이지로 이동하는 로직 구현할 것.
       */
      // if (resData.id) {
      //   navigate(`/items/${resData.id}`);
      // }
      navigate('/items');
    },
  });

  // * onSubmit테스트 코드입니다.
  const onSubmit = async (data: any) => {
    let image = null;
    if (imageUpload) {
      // console.log('previewImage', previewImage);
      const formData = new FormData();
      formData.append('image', imageUpload);
      image = await createImage.mutateAsync(formData);
    }

    await createProduct.mutate({ tags: tagState.tags, image, ...data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-40 mt-4 flex w-full flex-col px-6 lg:mt-6 lg:w-7/12 lg:px-0"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">상품 등록하기</h1>
        <button
          className={`rounded-lg px-7 py-3 text-white ${isValid ? 'bg-[var(--btn-blue1)]' : 'bg-[var(--cool-gray400)]'}`}
          disabled={!isValid}
        >
          등록
        </button>
      </div>
      <div className="mt-4 flex flex-col">
        <label htmlFor="image" className="text-sm font-bold sm:text-lg">
          상품 이미지
        </label>
        <div className="mt-3 flex gap-x-6">
          <input
            type="file"
            id="image"
            name="image"
            placeholder="이미지를 업로드해주세요"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-xl bg-[var(--cool-gray100)] text-[var(--cool-gray400)] lg:h-72 lg:w-72"
          >
            <p className="text-5xl">+</p>
            <p className="mt-3">이미지 등록</p>
          </label>
          {previewImage && (
            <div className="relative">
              <img
                src={previewImage}
                alt="previewImage"
                className="h-40 w-40 rounded-xl object-fill lg:h-72 lg:w-72"
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setPreviewImage(null)}
              >
                <img src={deletePreviewImageIcon} alt="deletepreviewimage" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <label htmlFor="productName" className="text-sm font-bold sm:text-lg">
          상품명
        </label>
        <input
          type="text"
          id="productName"
          {...register('productName', {
            required: formErrorMessage.required,
          })}
          name="productName"
          placeholder="상품명을 입력해주세요"
          className="mt-3 rounded-xl bg-[var(--cool-gray100)] py-4 pl-6"
          required
        />
        {errors.productName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.productName.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-col">
        <label htmlFor="productIntro" className="text-sm font-bold sm:text-lg">
          상품 소개
        </label>
        <textarea
          // type="text"
          id="productIntro"
          {...register('productIntro', {
            required: formErrorMessage.required,
          })}
          name="productIntro"
          placeholder="상품소개를 입력해주세요"
          className="mt-3 resize-none rounded-xl bg-[var(--cool-gray100)] pb-32 pl-6 pt-4 lg:pb-40"
          required
        ></textarea>
        {errors.productIntro && (
          <p className="mt-1 text-sm text-red-500">
            {errors.productIntro.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-col">
        <label htmlFor="price" className="text-sm font-bold sm:text-lg">
          판매가격
        </label>
        <input
          type="text"
          id="price"
          {...register('price', {
            required: formErrorMessage.required,
            pattern: {
              value: /^[0-9]+$/,
              message: formErrorMessage.pattern.number,
            },
          })}
          name="price"
          placeholder="판매 가격을 입력해주세요"
          className="mt-3 rounded-xl bg-[var(--cool-gray100)] py-4 pl-6"
          required
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-500">
            {errors.price.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-col">
        <label htmlFor="tag" className="text-sm font-bold sm:text-lg">
          태그
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          placeholder="태그를 입력해주세요"
          className="mt-3 rounded-xl bg-[var(--cool-gray100)] py-4 pl-6"
          value={tagState.tagInput}
          onChange={handleTagInput}
          // 맥북 한글 마지막 글자 중복으로 인한 onKeyPress 이용
          onKeyPress={handleTagKeyDown}
        />
        <div className="mt-3 flex flex-wrap gap-x-3">
          {tagState.tags.map((tag, idx) => {
            return (
              <div
                key={idx}
                className="flex gap-x-2 rounded-3xl bg-[var(--cool-gray50)] px-4 py-3"
              >
                <span>{tag}</span>
                <img
                  src={closeTagIcon}
                  alt="close tag"
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => handleRemoveTag(idx)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
}
