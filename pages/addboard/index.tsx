import BlueButton from "@/components/BlueButton";
import { useRouter } from "next/router";

export default function AddBoard() {
  const router = useRouter();
  const { articleId } = router.query;
  console.log(articleId);

  return (
    <form>
      <div>
        <h2>게시글 쓰기</h2>
        <BlueButton type="submit">등록</BlueButton>
      </div>
      <label htmlFor="title">*제목</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="제목을 입력해주세요"
      />
      <label htmlFor="content">*내용</label>
      <textarea id="content" name="content" placeholder="내용을 입력해주세요" />
      <label htmlFor="imageUpload">이미지</label>
      <input
        type="file"
        id="imageUpload"
        name="imageUpload"
        accept="image/*"
        placeholder="이미지 등록"
      />
    </form>
  );
}
