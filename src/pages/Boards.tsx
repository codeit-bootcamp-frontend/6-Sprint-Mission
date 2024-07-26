import { Link } from "react-router-dom"
import BestPosts from "../components/BestPosts"
import Posts from "../components/Posts"


export default function Boards() {
  return (
    <div className="m-[8rem_auto_2rem] w-full max-w-[1200px] px-4 md:m-[0] md:p-[8rem_5rem_5rem] lg:m-[0_auto_5rem]">
      <h3 className="mb-4 text-[20px] font-bold">베스트 게시글</h3>
      <div className="mb-[3rem] flex w-full justify-center">
        <BestPosts initialBestPosts={[]} />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="mb-4 text-[20px] font-bold">게시글</h3>
        <Link
          to="/addBoards"
          className="bg-btn-1 hover:bg-btn-2 inline-flex h-[42px] cursor-pointer items-center justify-center rounded-[0.5rem] border-none px-[1rem] py-[0.5rem] text-white"
        >
          글쓰기
        </Link>
      </div>
      <Posts initialPosts={[]} />
    </div>
  );
}

