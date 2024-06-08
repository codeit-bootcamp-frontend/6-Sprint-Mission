import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchForm from "@/components/SearchForm";
import ArticleList from "@/components/ArticleList";
import axios from "@/lib/axios";


export default function Boards() {
  const [articles, setArticles] = useState([]);

  const router = useRouter();
  const { keyword } = router.query;

  async function getArticles(query = "") {
    const res = await axios.get(`/articles/?keyword=${query}`);
    const nextArticles = res.data.list;
    setArticles(nextArticles);
  }

  useEffect(() => {
    getArticles(keyword);
  }, [keyword]);

  return (
    <div>
      <SearchForm initialValue={keyword} />
      <ArticleList articles={articles} />
    </div>
  );
}
