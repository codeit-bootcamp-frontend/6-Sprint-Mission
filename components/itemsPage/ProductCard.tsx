import Product from "@/types/product";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  item,
  bestSize,
}: {
  item: Product;
  bestSize?: boolean;
}) => {
  const { images, name, price, favoriteCount } = item;

  return (
    <div className="flex flex-col gap-16 mb-16">
      {images ? (
        <Link
          href={`/items/${item.id}`}
          className={` ${bestSize ? "relative aspect-square h-343 w-343 md:h-336 md:w-336 xl:h-282 xl:w-282" : "relative aspect-square h-168 w-168 rounded-16 md:h-221 md:w-221"}`}
        >
          <Image className="rounded-16" src={images[0]} fill alt="product" />
        </Link>
      ) : (
        ""
      )}
      <div className="flex flex-col gap-6">
        <div className="text-14 font-medium text-[#1f2937]">{name}</div>
        <div className="text-16 font-bold text-[#1f2937]">{price}원</div>
        <div className="flex items-center gap-4 text-12 font-medium text-[#4b5563]">
          <Image
            src="/images/ic_heart.svg"
            width={16}
            height={16}
            alt="하트아이콘"
          />
          {favoriteCount}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
