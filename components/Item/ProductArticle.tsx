import getProduct from "@/api/products/product";
import { deleteProduct, patchProduct } from "@/api/products/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import HeartIcon from "@/public/images/ic_heart.svg";

const ProductArticle = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const productId = Number(query.productId);

  const queryClient = useQueryClient();

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newValues, setNewValues] = useState({
    price: "",
    description: "",
    name: "",
  });

  const validation =
    (newValues.price && newValues.description && newValues.name).trim() === ""
      ? true
      : false;

  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: isReady && !isNaN(productId),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (product) {
      setNewValues({
        price: product.price,
        description: product.description,
        name: product.name,
      });
    }
  }, [product]);

  const uploadProductMutation = useMutation({
    mutationFn: ({ productId, values }: { productId: number; values: any }) =>
      patchProduct({ productId, values }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      setIsEdit(false);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/items");
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: (isFavorite: boolean) => {
      return isFavorite
        ? axios.delete(`/products/${productId}/favorite`)
        : axios.post(`/products/${productId}/favorite`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    uploadProductMutation.mutate({ productId, values: newValues });
  };

  const handleMenuVisible = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleEditProduct = () => {
    setIsEdit(!isEdit);
  };

  const handleDeleteProduct = () => {
    deleteProductMutation.mutate(productId);
  };

  const handleHeartVisible = () => {
    toggleFavoriteMutation.mutate(product.isFavorite);
  };

  const handleNewValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isPending) return <div>로딩 중입니다...</div>;
  if (isError) return <div>상품을 불러오는데 실패했습니다.</div>;
  if (!product) return null;

  return (
    <div className="md: flex flex-col gap-24 md:flex-row md:gap-13 xl:gap-24">
      <div className="md:h-340 md:w-340 xl:h-486 xl:w-486">
        <Image
          layout="responsive"
          className="rounded-12"
          width={343}
          height={343}
          src={product.images[0]}
          alt="상품 이미지"
        />
      </div>
      <div className="flex flex-1 flex-col gap-24">
        <div className="flex flex-col gap-8 border-b border-solid border-gray-20 pb-12 md:gap-16">
          <div className="relative flex justify-between">
            {isEdit ? (
              <input
                name="name"
                onChange={handleNewValueChange}
                className="h-42 w-[90%] rounded-6 bg-gray-10 px-12 py-8 text-12 text-black-800 md:text-14"
                value={newValues.name}
              />
            ) : (
              <div className="text-20 font-semibold leading-[32px] text-black-800">
                {product.name}
              </div>
            )}
            <Image
              className="cursor-pointer"
              onClick={handleMenuVisible}
              src="/images/ic_kebab.svg"
              width={24}
              height={24}
              alt="케밥아이콘"
            />
            {isOpenDropdown ? (
              <div className="absolute right-[-70px] top-28 h-64 w-72 flex-col rounded-6 bg-white py-6 text-12 border-1px-solid-gray-30 flex-center md:h-74 md:w-86 md:text-14">
                <div
                  onClick={handleEditProduct}
                  className="cursor-pointer px-8 py-4 text-black-900 flex-center hover:rounded-4 hover:bg-skyblue md:px-12"
                >
                  수정하기
                </div>
                <div
                  onClick={handleDeleteProduct}
                  className="cursor-pointer px-8 py-4 text-black-900 flex-center hover:rounded-4 hover:bg-skyblue md:px-12"
                >
                  삭제하기
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {isEdit ? (
            <input
              name="price"
              onChange={handleNewValueChange}
              className="h-42 w-[20%] rounded-6 bg-gray-10 px-12 py-8 text-12 text-black-800 md:text-14"
              value={newValues.price}
            />
          ) : (
            <div className="text-32 font-semibold leading-[42px] text-black-800">
              {product.price}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-14 font-medium leading-[24px] text-gray-600">
            상품 소개
          </div>
          {isEdit ? (
            <textarea
              name="description"
              onChange={handleNewValueChange}
              className="h-80 w-full resize-none rounded-6 bg-gray-10 px-12 py-8 text-12 text-black-800 md:text-14"
              value={newValues.description}
            />
          ) : (
            <pre className="whitespace-pre-wrap text-16 font-normal leading-[26px] text-black-800">
              {product.description}
            </pre>
          )}
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-14 font-medium leading-[17px] text-gray-600">
            상품 태그
          </div>
          <div className="flex h-max w-max gap-8">
            {product.tags.map((tag: string) => (
              <div
                className="rounded-26 bg-gray-10 px-16 py-6 text-16 font-normal leading-[24px] text-black-800"
                key={tag}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
          <div
            onClick={handleHeartVisible}
            className="flex h-40 w-max cursor-pointer items-center gap-4 rounded-35 border border-solid border-gray-20 px-12 py-4"
          >
            <div className="relative h-32 w-32">
              <HeartIcon
                color={`${product.isFavorite ? "#3692ff" : "white"}`}
                stroke={`${product.isFavorite ? "#3692ff" : "#6B7280"}`}
                width={32}
                height={32}
              />
            </div>
            <div
              className={`${product.isFavorite ? "text-blue" : "text-gray-500"} text-16 font-medium leading-[26px]`}
            >
              {product.favoriteCount}
            </div>
          </div>
          {isEdit ? (
            <button
              disabled={validation}
              onClick={handleSubmit}
              className={`${validation ? "bg-gray-400" : "bg-blue"} ml-auto flex h-42 w-74 cursor-pointer items-center rounded-8 px-23 py-12 text-16 font-semibold leading-[26px] text-gray-50`}
            >
              수정
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductArticle;
