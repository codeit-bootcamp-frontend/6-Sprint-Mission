import axios from "axios";
import { Article } from "@/@types/api";
import BestArticle from "@/components/boards/BestArticle";

export async function getStaticProps() {
  try {
    const API_URL = "https://panda-market-api.vercel.app/articles";
    const query = {
      orderBy: "like",
    };

    const res = await axios.get(API_URL, { params: query });
    const articles: Article[] = res.data.list;

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("API 요청 중 에러 발생:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
}

export default function Board({ articles }: { articles: Article[] }) {
  return (
    <div>
      <div className="w-[1200px] mx-auto mt-5">
        <BestArticle articles={articles} />
      </div>
    </div>
  );
}
