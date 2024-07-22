"use client";

import Link from "next/link";
import Card from "@/components/Card/Card";

interface ItemPageCardProps {
  className?: string;
  data: Item;
}

function ItemCard({ data, className }: ItemPageCardProps) {
  const { id, name, price, images, favoriteCount, isFavorite = false } = data;

  const previewImage = images[0];
  const formattedPrice = `${price.toLocaleString()}원`;

  return (
    <Card className={`flex flex-col gap-8 ${className}`}>
      <Link href={`/items/${id}`}>
        <div className={`mt-16 flex flex-col gap-8`}>
          <Card.Image
            src={previewImage}
            alt={name}
            className="pb-full h-full w-full overflow-hidden rounded-[15%]"
          />
          <Card.SubTitle className="text-14 font-medium">{name}</Card.SubTitle>
          <Card.Title className="text-16 font-bold">
            {formattedPrice}
          </Card.Title>
        </div>
      </Link>
      <div className="flex h-6 w-16 items-center gap-2">
        <Card.Favorite
          isFavorite={isFavorite}
          favoriteCount={favoriteCount}
          disabled={true}
        />
      </div>
    </Card>
  );
}

export default ItemCard;
