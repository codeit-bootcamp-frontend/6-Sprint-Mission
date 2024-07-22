"use client";

import { useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import removeAllWhitespace from "@/lib/utils/removeAllWhitespace";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/UserAtom";

const DEFAULT_PLACEHOLDER =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

interface CommentAddFormProps {
  className?: string;
  label?: string;
  placeholder?: string;
  addCommentMutation?: any;
}

const CommentAddForm = ({
  className,
  label = "Comment",
  placeholder = DEFAULT_PLACEHOLDER,
  addCommentMutation,
}: CommentAddFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isValidation, setIsValidation] = useState(false);

  const { user } = useRecoilValue(userAtom);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputValue(e.target.value);
    setIsValidation(!!removeAllWhitespace(e.target.value));
  };

  const handleAddComment: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (!user) return alert("로그인 후 이용해주세요");

    addCommentMutation.mutate(inputValue.trim(), {
      onSuccess: () => {
        alert("댓글작성성공 업로드 되었습니다!");
        setInputValue("");
      },
    });
  };

  return (
    <form
      className={`flex flex-col gap-16 ${className}`}
      onSubmit={handleAddComment}
    >
      <label className="text-16 font-semibold text-cool-gray-800">
        {label}
      </label>
      <Input.TextArea
        className="h-104 px-24 py-16"
        placeholder={placeholder}
        onChange={handleChange}
        value={inputValue}
      />
      <Button
        className="ct--primary-button ml-auto h-42 w-71 text-14"
        type="submit"
        disabled={!isValidation || addCommentMutation.isPending}
      >
        {addCommentMutation.isPending ? "등록 중..." : "등록"}
      </Button>
    </form>
  );
};

export default CommentAddForm;
