import { useState } from "react";
import { GetArticlesType } from "@/apis/getArticles";

type PropGetData = GetArticlesType;

type HandleLoadType = (
  ...arg: Parameters<PropGetData>
) => ReturnType<PropGetData>;

const useLoad = (getData: PropGetData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const handleLoad: HandleLoadType = async (...args) => {
    try {
      setLoadingError(null);
      setIsLoading(true);
      const result = await getData(...args);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        setLoadingError(error);
      } else {
        setLoadingError(new Error("에러가 발생해 버렸어요 ㅠㅠㅠ"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, loadingError, handleLoad] as const;
};

export default useLoad;
