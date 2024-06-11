import { Article } from "@/@types/api";
import Image from "next/image";
import Medal from "@/public/ic_medal.png";
import Heart from "@/public/heart.png";
import { formatDate } from "@/utils/dateformat";

export default function ArticleCard({ article }: { article: Article }) {
  const formattedDate = formatDate(new Date(article.createdAt));
  return (
    <div className="w-[400px] bg-coolGray-50 px-10 rounded-[8px]">
      <div className="w-[120px] h-[30px] bg-primaryColor flex justify-center items-center rounded-b-[32px] p-2 gap-1">
        <Image src={Medal} width={20} height={20} alt="medal" />
        <p className="text-white">Best</p>
      </div>
      <div className="h-[100px] flex justify-between my-4 relative">
        <p className="w-[240px] font-semibold text-lg mb-5">{article.title}</p>
        <div className="w-[80px] relative">
          {article.image ? (
            <Image
              src={article.image}
              alt="thumbnail"
              fill
              className="object-fit"
            />
          ) : null}
        </div>
      </div>
      <div className="flex justify-between text-sm  text-coolGray-600">
        <div className="flex gap-2 pb-5">
          <p>{article.writer.nickname}</p>
          <div className="flex gap-1">
            <Image
              src={Heart}
              width={14}
              height={14}
              alt="heart"
              className="h-[16px]"
            />
            <p>{article.likeCount}</p>
          </div>
        </div>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
}
