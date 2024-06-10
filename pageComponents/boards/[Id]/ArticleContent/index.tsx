import HeartButton from "@/components/HeartButton";
import Image from "next/image";
import ic_user from "@/images/ic_user.png";
import formatTime from "@/utils/formatTime";
import KebabButton from "@/components/KebabButton";
import postArticleLike from "@/apis/postArticleLike";

interface PropType {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  updatedAt: string;
  nickname: string;
}

const ArticleContent = ({
  id,
  title,
  content,
  image,
  likeCount,
  updatedAt,
  nickname,
}: PropType) => {
  const date = formatTime(updatedAt);

  const handleHeartButton = async () => {
    try {
      await postArticleLike({ articleId: id });
      window.alert("좋아요 성공");
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-[1.6rem]">
      <div className="flex justify-between">
        <h2 className="font-bold text-[2rem] leading-[2.4rem]">{title}</h2>
        <div className="align-top">
          <KebabButton width={24} height={24} />
        </div>
      </div>

      <div className="flex gap-[1.6rem]">
        <div className="flex gap-[0.8rem] items-center">
          <Image src={ic_user} alt="유저 아이콘" width={24} height={24} />
          <span className="font-normal text-[1.4rem] leading-[1.7rem] text-gray-600">
            {nickname}
          </span>
          <span className="font-normal text-[1.2rem] leading-[1.4rem] text-gray-400">
            {date}
          </span>
        </div>

        <div
          className="w-[0.1rem] bg-gray-200
          h-full"
        />

        <div className="flex items-center gap-[0.4rem]">
          <HeartButton width={24} height={24} onClick={handleHeartButton} />
          <span className="font-normal text-[1.4rem] leading-[1.7rem] text-gray-500">
            {likeCount}
          </span>
        </div>
      </div>

      <div
        className="h-[0.1rem] bg-gray-200
          w-full"
      />

      <div className="flex justify-between">
        <p className="font-normal text-[1.6rem] leading-[2.4rem] text-gray-800">
          {content}
        </p>

        {image && (
          <Image src={image} alt="게시물 사진" width={72} height={72} />
        )}
      </div>
    </div>
  );
};

export default ArticleContent;
