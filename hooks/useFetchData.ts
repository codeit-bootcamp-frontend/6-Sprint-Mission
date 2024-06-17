import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

function useFetchData<T>(url: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res: AxiosResponse<T> = await axios.get(url);
        setData(res.data);
        setError(null);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, loadingError };
}

export default useFetchData;
