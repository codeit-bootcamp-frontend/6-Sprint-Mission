import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getProductById, getProductComments } from '@/apis/products';

import BackButton from '@/components/BackButton';
import Comment from '@/components/Comment';
import CommentForm from '@/components/CommentForm';

import { formatNumberWithCommas } from '@/utils/formatNumber';

import { Product, ProductComment } from '@/types/product';

export default function ProductItem() {
  const [product, setProduct] = useState<Product | undefined>();
  const [comments, setComments] = useState<ProductComment[] | undefined>();

  const { isReady, query } = useRouter();
  const id = Number(query.id);

  useEffect(() => {
    if (!isReady) return;

    const loadProductData = async (productId: number) => {
      const productData: Product = await getProductById(productId);
      setProduct(productData);
    };

    const loadCommentsData = async (productId: number) => {
      const CommentsData: ProductComment[] =
        await getProductComments(productId);
      setComments(CommentsData);
    };

    loadProductData(id);
    loadCommentsData(id);
  }, [isReady]);

  if (!product) return;

  return (
    <div>
      <ProductDetail product={product} />
      <hr className="my-4 tablet:my-6 desktop:my-8" />
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold text-gray-800">문의하기</h3>
        <CommentForm
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          onSubmit={() => {}}
        />
      </div>
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
      <div className="mt-10 flex justify-center">
        <BackButton to={'/products'} />
      </div>
    </div>
  );
}

type ProductDetailProp = {
  product: Product;
};

function ProductDetail({ product }: ProductDetailProp) {
  const { name, price, description, tags, images, isFavorite, favoriteCount } =
    product;

  return (
    <div className="flex w-full flex-col gap-4 tablet:flex-row desktop:gap-6">
      <div className="relative mx-auto mb-auto aspect-square max-h-[486px] w-full max-w-[486px]">
        <Image
          src={images[0]}
          alt="상품 사진"
          fill
          className="left-0 top-0 rounded-xl object-cover"
          priority
        />
      </div>
      <div className="relative flex grow flex-col">
        <div className="absolute right-0 top-0">
          <Image
            src="/images/ic_kebab.svg"
            alt="메뉴 아이콘"
            width={24}
            height={24}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-gray-800 tablet:text-xl desktop:text-2xl">
            {name}
          </h2>
          <h3 className="text-2xl font-semibold text-gray-800 tablet:text-[32px] desktop:text-[40px]">
            {formatNumberWithCommas(price)}원
          </h3>
        </div>
        <hr className="my-4 text-gray-200" />
        <div className="flex grow flex-col items-start gap-6 tablet:min-w-[420px]">
          <div>
            <h3 className="text-sm font-medium text-gray-600">상품 소개</h3>
            <pre className="mt-2 text-base font-normal text-gray-800">
              {description}
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">상품 태그</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="whitespace-nowrap rounded-full bg-gray-100 px-4 py-[6px] text-base font-normal text-gray-800"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex min-w-max items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1">
            <Image
              src={
                isFavorite
                  ? '/images/ic_heart_full.svg'
                  : '/images/ic_heart_empty.svg'
              }
              alt={isFavorite ? '꽉 찬 하트' : '빈 하트'}
              width={24}
              height={24}
            />
            <p className="text-base font-medium text-gray-500">
              {favoriteCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyComment() {
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <Image
        src="/images/img_reply_empty.svg"
        width={140}
        height={140}
        alt="말풍선 아이콘"
      />
      <p className="text-base font-normal text-gray-400">아직 문의가 없어요,</p>
      <p className="text-base font-normal text-gray-400">
        지금 문의를 달아보세요!
      </p>
    </div>
  );
}
