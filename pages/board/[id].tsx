import LinkButton from "@/src/components/button/LinkButton";
import SubmitButton from "@/src/components/button/SubmitButton";
import TextArea from "@/src/components/input/TextArea";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const BoardsDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(true);

  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    comment !== "" ? setDisabled(false) : setDisabled(true);
  }, [comment]);

  return (
    <div className="px-6 py-8 max-w-[1200px] mx-auto grid gap-6">
      <div className="mb-10">게시글 상세 영역</div>
      <div className="grid gap-4">
        <h3 className="font-semibold leading-[1.2]">댓글 달기</h3>
        <TextArea
          heightStyle={104}
          value={comment}
          placeholder="댓글을 입력해주세요."
          onChange={onChangeComment}
        />
        <SubmitButton disabled={disabled}>등록</SubmitButton>
      </div>
      <div className="pb-4">댓글 목록 영역</div>
      <LinkButton href={"/boards"}>목록으로 돌아가기</LinkButton>
    </div>
  );
};

export default BoardsDetail;
