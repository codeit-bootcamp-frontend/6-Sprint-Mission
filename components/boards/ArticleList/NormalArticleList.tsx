import { Order } from "@/constants/boards";
import useFetchData from "@/hooks/useFetchData";
import { Articles } from "@/interfaces/Article.interface";
import ArticleList from "./ArticleList";

function NormalArticleList({
  order,
  keyword,
}: {
  order: Order;
  keyword: string;
}) {
  const query = `?orderBy=${order}&keyword=${keyword}`;
  const fetchedData = useFetchData<Articles>(`/articles${query}`);
  const { data: articles, isLoading, loadingError } = fetchedData;

  return (
    <ArticleList
      articles={articles}
      isLoading={isLoading}
      loadingError={loadingError}
    />
  );
}

export default NormalArticleList;
