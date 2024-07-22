"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";
import useFormData from "@/hooks/useFormData";
import { ItemTagList } from "@/components/PageComponents/items";
import { createProduct } from "@/lib/api/product";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const TAG_LIMIT = 7;

interface ItemRequestType {
  name: string;
  price: number;
  description: string;
  tags: string[];
  images: File[] | string[];
}

const AddItem = () => {
  const [tag, setTag] = useState("");
  const [isValidation, setIsValidation] = useState(false);
  const router = useRouter();
  const {
    formData,
    setFormData,
    handleChange,
    handleImagesChange,
    deleteFieldValue,
  } = useFormData({
    name: null,
    price: null,
    description: null,
    tags: [],
    images: [],
  });
  const queryClient = useQueryClient();
  const { name, price, description, tags, images } = formData;
  const formatPrice = Number(price).toLocaleString();

  const handleChangePrice: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const formatValue = e.target.value.replace(/\D/g, "");
    setFormData((prevValues) => ({
      ...prevValues,
      price: Number(formatValue),
    }));
  };

  const handleChangeTag: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const formatValue = e.target.value.replaceAll(" ", "");
    setTag(formatValue);
  };

  const handleDeleteTag = (tag: string) => {
    deleteFieldValue("tags", tag);
  };

  const handleUpdateTags = (e: any) => {
    const target = e.target as HTMLInputElement;
    const value = target?.value;
    if (value && tags.length < TAG_LIMIT && !tags.includes(value)) {
      handleChange(e);
    }
    setTag("");
  };

  const handleKeyDownTags = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateTags(e);
    }
  };

  const uploadProductMutation = useMutation({
    mutationFn: (newProduct: ItemCreationData) => createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await uploadProductMutation.mutateAsync(
        formData as ItemCreationData,
      );
      const data = await response;
      const id = data.id;
      router.replace(`/items/${id}`);
    } catch (error) {
      alert(`Error adding post: ${error}`);
    }
  };

  useEffect(() => {
    if (name && price && description && images) {
      setIsValidation(true);
    } else {
      setIsValidation(false);
    }
  }, [name, price, description, tags, images]);

  const FORM_GROUP = [
    {
      name: "images",
      label: "상품 이미지",
      renderInputField: (props: any) => (
        <FormGroup.InputField.Images {...props} />
      ),
      inputFieldProps: {
        placeholder: "이미지 등록",
        className: "h-168 w-168 xl:h-282 xl:w-282",
        onChange: handleImagesChange,
      },
    },
    {
      name: "name",
      label: "상품명",
      renderInputField: (props: any) => <FormGroup.InputField {...props} />,
      inputFieldProps: {
        placeholder: "상품명을 입력해주세요",
        onChange: handleChange,
        required: true,
      },
    },
    {
      name: "price",
      label: "판매 가격",
      renderInputField: (props: any) => <FormGroup.InputField {...props} />,
      inputFieldProps: {
        placeholder: "판매가격을 입력해주세요",
        value: price && formatPrice,
        onChange: handleChangePrice,
        required: true,
      },
    },
    {
      name: "description",
      label: "상품 소개",
      renderInputField: (props: any) => (
        <FormGroup.InputField.TextArea {...props} />
      ),
      inputFieldProps: {
        placeholder: "내용을 입력해주세요",
        className: "h-200 xl:h-282",
        onChange: handleChange,
        required: true,
      },
    },
    {
      name: "tags",
      label: "태그",
      renderInputField: (props: any) => <FormGroup.InputField {...props} />,
      inputFieldProps: {
        placeholder: "태그를 입력해주세요",
        value: tag,
        onChange: handleChangeTag,
        onBlur: handleUpdateTags,
        onKeyDown: handleKeyDownTags,
      },
    },
  ];

  return (
    <div className="relative mb-100">
      <h1 className="py-36 text-20 font-bold">상품 등록하기</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-16">
        {FORM_GROUP.map(
          ({ name, label, renderInputField, inputFieldProps }) => {
            return (
              <FormGroup key={name}>
                <FormGroup.Label
                  htmlFor={name}
                  className="font-bold"
                  children={label}
                />
                {renderInputField({ label: name, ...inputFieldProps })}
              </FormGroup>
            );
          },
        )}

        {tags && (
          <ItemTagList
            tags={tags}
            className="mt-8 flex h-auto min-h-100 w-full flex-wrap gap-8"
            onClickTag={(tag) => handleDeleteTag(tag)}
            isEditable={true}
          />
        )}

        <Button
          className="ct--primary-button absolute right-0 top-0 my-36 h-42 w-74"
          type="submit"
          disabled={!isValidation || uploadProductMutation.isPending}
        >
          등록
        </Button>
      </form>
    </div>
  );
};

export default AddItem;
