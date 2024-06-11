import { formatDate } from "@/shared/lib/formatDate";
import { ItemImage } from "@/shared/ui/itemImage";
import { LikeCount } from "@/shared/ui/LikeCount";
import Image from "next/image";

interface Props {
  title: string;
  image: string | null;
  nickname: string;
  likeCount: number;
  createdAt: string;
  id: number;
}

export function BestPostCard({
  title,
  image,
  nickname,
  likeCount,
  createdAt,
  id,
}: Props) {
  return (
    <section className="relative h-full rounded-lg bg-[#f9fafb] px-6 pb-4">
      <header className="relative h-[30px] w-[103px]">
        <Image
          fill
          src="/images/bestPostLabel.png"
          alt="best Post Label"
          className="z-0"
        />
        <div className="absolute left-5 top-2 z-10 flex h-4 items-center gap-2">
          <Image width={16} height={16} src="/icons/medal.png" alt="medal" />
          <p className="text-base font-semibold tracking-wide text-white">
            Best
          </p>
        </div>
      </header>
      <main className="overflow-hidden">
        <header className="mt-4 flex h-[72px] gap-2 overflow-auto text-lg font-semibold scrollbar-hide">
          {title}
          <ItemImage imageUrl={image} />
        </header>
      </main>
      <footer className="mt-4 flex justify-between text-sm">
        <header className="flex items-center gap-2 font-normal text-[#4b5563]">
          {nickname}
          <LikeCount
            className="flex items-center gap-1"
            height={16}
            id={id}
            likeCount={likeCount}
            width={16}
          />
        </header>
        <footer className="text-[#9ca3af]">
          {formatDate(new Date(createdAt))}
        </footer>
      </footer>
    </section>
  );
}
