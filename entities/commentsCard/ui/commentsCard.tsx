import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { compareDateWithNow } from "@/shared/lib/formatDate";
import Image from "next/image";

interface Props {
  createdAt: string;
  nickname: string;
  content: string;
  image: string | null;
}

export function CommentsCard({ createdAt, nickname, content, image }: Props) {
  return (
    <section>
      <header className="mt-6 flex justify-between">
        <div className="text-sm text-[#1f2937]">{content}</div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              width={24}
              height={24}
              src={"/images/ic_kebab.png"}
              alt="edit button"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-lg">
            <DropdownMenuItem className="cursor-pointer px-5 py-3">
              수정
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-5 py-3">
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <figure>
        <Image
          width={32}
          height={32}
          src={image ?? "/icons/profileIcon.png"}
          alt="comments profile"
        />
        <section className="text-xs">
          <p>{nickname}</p>
          <p>{compareDateWithNow(new Date(createdAt)) + " 전"}</p>
        </section>
      </figure>
    </section>
  );
}
