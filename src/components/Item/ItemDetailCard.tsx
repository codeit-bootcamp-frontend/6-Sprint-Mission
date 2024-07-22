"use client";

import Card from "@/components/Card/Card";
import useFavoriteButton from "@/hooks/useFavoriteButton";

const ItemDetailCard = ({ data }: { data: Item }) => {
  const { id, name, price, description, tags, images } = data;

  const formatPrice = price.toLocaleString();

  const favoriteButtonProps = useFavoriteButton("products", id.toString());

  return (
    <Card className="flex flex-col gap-4 border-b border-gray-300 md:flex-row md:border-none">
      <Card.Image
        src={images?.[0]}
        alt={name}
        className="md:mr-24 md:h-auto md:w-486"
      />
      <div className="flex flex-grow flex-col">
        <div className="mb-16">
          <Card.Title
            className="text-lg font-semibold md:text-xl"
            children={name}
          />
          <Card.SubTitle
            className="border-b border-gray-300 pb-16 text-40 font-semibold md:text-32"
            children={formatPrice}
          />
        </div>
        <div className="mb-16">
          <Card.SubTitle
            className="font-medium text-gray-500"
            children="상품 소개"
          />
          <Card.Description className="text-gray-700">
            {description}
          </Card.Description>
        </div>
        <p className="font-medium text-gray-500">상품태그</p>
        <Card.TagBox
          className="mb-24 mt-8 flex h-auto w-full flex-wrap gap-8"
          tags={tags}
        />

        <div>
          <Card.Favorite
            {...favoriteButtonProps}
            className="mb-16 flex h-40 w-auto items-center gap-8 rounded-full border border-gray-200 px-16 text-sm md:text-base"
          />
        </div>
      </div>
    </Card>
  );
};

export default ItemDetailCard;
