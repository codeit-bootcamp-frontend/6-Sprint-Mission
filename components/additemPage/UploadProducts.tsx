import Header from "./Header";
import FileInput from "./FileInput";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import { postProduct } from "@/api/products/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductForm } from "@/types/product";

const UploadProducts = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [values, setValues] = useState({
    images: "",
    tags: [""],
    price: "",
    description: "",
    name: "",
  });
  const { name, description, price, tags } = values;

  const validateButton =
    (name && description && price).trim() === "" && tags.length !== 0
      ? true
      : false;

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    handleChangeValues(name, value);
  };

  const handleChangeValues = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const uploadProductMutation = useMutation({
    mutationFn: (values: ProductForm) => postProduct(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      router.push(`/items/${data.id}`);
    },
  });

  const handleFormSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadProductMutation.mutate(values);
  };

  return (
    <div className="mx-auto my-0 max-w-[1200px]">
      <form onSubmit={handleFormSubmit}>
        <Header validateButton={validateButton} />
        <FileInput setValues={setValues} />
        <div className="flex flex-col gap-24 mt-24 mb-170">
          <label className="flex flex-col gap-12 text-18 font-bold text-[#1f2937]">
            상품명
            <input
              name="name"
              value={name}
              onChange={handleInputChange}
              className="h-56 rounded-12 border-none bg-[#f3f4f6] pl-24 text-16 font-normal placeholder:text-16 placeholder:font-normal placeholder:leading-[26px] placeholder:text-[#9ca3af]"
              placeholder="상품명을 입력해주세요"
            />
          </label>

          <label className="flex flex-col gap-12 text-18 font-bold text-[#1f2937]">
            상품 소개
            <textarea
              name="description"
              value={description}
              onChange={handleInputChange}
              className="h-200 rounded-12 border-none bg-[#f3f4f6] pl-24 pt-16 text-16 font-normal placeholder:text-16 placeholder:font-normal placeholder:leading-[26px] placeholder:text-[#9ca3af]"
              placeholder="상품 소개를 입력해주세요"
            />
          </label>

          <label className="flex flex-col gap-12 text-18 font-bold text-[#1f2937]">
            판매가격
            <input
              name="price"
              value={price}
              onChange={handleInputChange}
              className="h-56 rounded-12 border-none bg-[#f3f4f6] pl-24 text-16 font-normal placeholder:text-16 placeholder:font-normal placeholder:leading-[26px] placeholder:text-[#9ca3af]"
              placeholder="판매가격을 입력해주세요"
            />
          </label>

          <label className="flex flex-col gap-12 text-18 font-bold text-[#1f2937]">
            태그
            <input
              name="tags"
              value={tags}
              onChange={handleInputChange}
              className="h-56 rounded-12 border-none bg-[#f3f4f6] pl-24 text-16 font-normal placeholder:text-16 placeholder:font-normal placeholder:leading-[26px] placeholder:text-[#9ca3af]"
              placeholder="태그를 입력해주세요"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UploadProducts;
