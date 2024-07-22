import btn_submit from "@/public/btn_submit.svg";
import Image from "next/image";
import styled from "styled-components";
import AddImage from "@/components/fileInput";

// Container 스타일 정의
const Container = styled.div`
  padding: 20px;
  margin: auto 360px;

  .SubmitSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title,
  .content,
  .image {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: #f3f4f6;
  }
`;

export default function AddArticlePage() {
  return (
    <Container>
      <div className="SubmitSection">
        <div>게시글 쓰기</div>
        <Image src={btn_submit} width={74} height={42} alt="등록" />
      </div>
      <div className="title">
        <label htmlFor="title">제목</label>
        <input id="title" placeholder="제목을 입력해주세요" />
      </div>
      <div className="content">
        <label htmlFor="content">내용</label>
        <input id="content" placeholder="내용을 입력해주세요" />
      </div>
      <div className="image">
        <label htmlFor="image">이미지</label>
        <input id="image" placeholder="이미지 등록" />
      </div>
      <AddImage />
    </Container>
  );
}
