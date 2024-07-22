"use client";

import Button from "@/components/Button/Button";
import CommentAddForm from "@/components/Comment/CommentAddForm";
import ItemComments from "./ItemComments";
import BackIcon from "/public/images/ic_back.svg";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createProductComment } from "@/lib/api/comment";

const ItemCommentSection = () => {
  const queryClient = useQueryClient();
  const prams = useParams<{ id: string }>();
  const id = prams?.id;

  const addCommentMutation = useMutation({
    mutationFn: (comment: string) => createProductComment(Number(id), comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productComments", id] });
    },
  });

  return (
    <>
      <CommentAddForm
        label="댓글 달기"
        placeholder="댓글을 입력해주세요"
        addCommentMutation={addCommentMutation}
      />
      <div className="mt-24 flex flex-col gap-24 pb-120 ">
        <ItemComments />
        <Button.Link
          className="ct--primary-rounded-button mx-auto mt-40 h-48 w-240 gap-10 text-18"
          href="/items"
        >
          목록으로 돌아가기
          <BackIcon />
        </Button.Link>
      </div>
    </>
  );
};

export default ItemCommentSection;
