"use client";

import { useState } from "react";
import CommentEditForm from "@/components/Comment/CommentEditForm";
import WriterInfo from "@/components/WriterInfo/WriterInfo";
import { deleteComment, updateComment } from "@/lib/api/comment";
import CommentActions from "./CommentActions";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
interface CommentProps {
  comment: Comment;
  isUserComment: boolean;
  onCommentEdited?: (comment: Comment) => void;
  onCommentDeleted?: (comment: Comment) => void;
}

const Comment = ({
  comment,
  isUserComment,
  onCommentEdited = () => {},
  onCommentDeleted = () => {},
}: CommentProps) => {
  const queryClient = useQueryClient();
  const [isEditable, setIsEditable] = useState(false);
  const { id, writer, content, createdAt } = comment;
  const { image, nickname } = writer;

  const prams = useParams<{ id: string }>();
  const productId = prams?.id;

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productComments", productId],
      });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: (comment: string) => updateComment(Number(id), comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productComments", productId],
      });
    },
  });

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate();
  };

  const onConfirmEditForm = (comment: string) => {
    updateCommentMutation.mutate(comment);
    setIsEditable(false);
  };

  return (
    <div className="relative flex flex-col gap-24 border-b border-cool-gray-100 pb-24">
      <div className="flex">
        {isEditable ? (
          <CommentEditForm
            initialValue={content}
            onConfirm={onConfirmEditForm}
            onCancel={() => setIsEditable(false)}
          />
        ) : (
          <>
            <div className="text-400 whitespace-pre-wrap text-16 text-cool-gray-800">
              {content}
            </div>
            {isUserComment && (
              <CommentActions
                onDelete={handleDeleteComment}
                onEdit={() => setIsEditable(true)}
              />
            )}
          </>
        )}
      </div>

      <WriterInfo className="flex items-center gap-8">
        <WriterInfo.ProfileImage className="" size={40} src={image} />
        <div>
          <WriterInfo.Writer nickname={nickname} className="mr-8" />
          <WriterInfo.UpdatedAt createdAt={createdAt} className="ml-auto" />
        </div>
      </WriterInfo>
    </div>
  );
};

export default Comment;
