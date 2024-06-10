import { Container } from "@/styles/CommonStyles";
import { useRouter } from "next/router";
import React from "react";

const BoardsThreadPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Container>{id}번 게시글 페이지</Container>;
};

export default BoardsThreadPage;
