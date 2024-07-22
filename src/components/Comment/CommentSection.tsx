import { useState } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/Button/Button";
import CommentAddForm from "@/components/Comment/CommentAddForm";
import Comment from "@/components/Comment/Comment";
import CommentEmpty from "@/components/Comment/CommentEmpty";
import BackIcon from "/public/images/ic_back.svg";
import { userAtom } from "@/recoil/atoms/UserAtom";
import { useRecoilValue } from "recoil";

interface CommentSectionProps {
  initialData: CommentResponse;
  dataFetcher: (cursor?: number) => Promise<CommentResponse>;
  returnPath?: string;
}

const CommentSection = ({
  initialData,
  dataFetcher,
  returnPath = "/",
}: CommentSectionProps) => {
  const { user } = useRecoilValue(userAtom);

  const [values, setValues] = useState(initialData);
  const { nextCursor, list } = values;
  const pathname = usePathname();

  return (
    <>
      <CommentAddForm
        label="댓글 달기"
        placeholder="댓글을 입력해주세요"
        onCommentAdded={handleCommentAdded}
      />
      <div className="mt-24 flex flex-col gap-24 pb-120 ">
        {list.length > 0 ? (
          <>
            {list.map((comment: Comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                isUserComment={(user && comment.writer.id === user.id) || false}
                onCommentEdited={handleCommentEdited}
                onCommentDeleted={handleCommentDeleted}
              />
            ))}
            {nextCursor && (
              <Button
                className="mx-auto h-42 w-88 rounded-8 border-1 border-gray-400 text-gray-600"
                onClick={() => fetchComments(nextCursor)}
              >
                .. 더보기
              </Button>
            )}
          </>
        ) : (
          <CommentEmpty />
        )}
        <Button.Link
          className="ct--primary-rounded-button mx-auto mt-40 h-48 w-240 gap-10 text-18"
          href={returnPath}
        >
          목록으로 돌아가기
          <BackIcon />
        </Button.Link>
      </div>
    </>
  );
};

export default CommentSection;
