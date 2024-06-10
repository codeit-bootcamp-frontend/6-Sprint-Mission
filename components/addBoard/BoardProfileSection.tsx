import { Article } from "@/types/articleTypes";
import Image from "next/image";
import { format } from "date-fns";
import LikeCountDisplay from "../ui/LikeCountDisplay";

interface BoardProfileSectionProps {
  article: Article;
}

const BoardProfileSection: React.FC<BoardProfileSectionProps> = ({
  article,
}) => {
  const dateString = format(new Date(article.createdAt), "yyyy. MM. dd");

  return (
    <>
      <div>
        <div>
          <div>{article.title}</div>
          {article.image && (
            <div>
              <div>
                <Image
                  fill
                  src={article.image}
                  alt={`${article.id}번 게시글 이미지`}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <div>
            {article.writer.nickname} <div>{dateString}</div>
          </div>

          <LikeCountDisplay count={article.likeCount} iconWidth={24} gap={8} />
        </div>
      </div>
      <hr />
      <div>{article.content}</div>
    </>
  );
};

export default BoardProfileSection;
