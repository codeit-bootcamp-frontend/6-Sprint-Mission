import { NUM_BEST_ARTICLES } from "@/constants/boards";
import useFetchData from "@/hooks/useFetchData";
import { Articles } from "@/interfaces/Article.interface";
import { useDevice } from "@/contexts/DeviceContext";
import ArticleList from "./ArticleList";

function BestArticleList() {
  const device = useDevice();
  const query = `?pageSize=${NUM_BEST_ARTICLES[device]}&orderBy=like`;
  const fetchedData = useFetchData<Articles>(`/articles${query}`);
  const { data: articles, isLoading, loadingError } = fetchedData;

  return (
    <ArticleList
      articles={articles}
      isLoading={isLoading}
      loadingError={loadingError}
      isBest={true}
    />
  );
}

export default BestArticleList;
