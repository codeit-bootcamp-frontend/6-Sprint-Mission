import { useState } from "react";
import { axiosRequester } from "lib/axios";
import { AxiosRequestConfig} from "axios";

type AxiosFetch = <T>(options: AxiosRequestConfig<T>) => Promise<T | any>;

export default function useAxiosFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const axiosFetch: AxiosFetch = async (options) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axiosRequester({...options});
      return res;
    } catch (err) {
      setError(err as Error);
      return err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { isLoading, error, axiosFetch };
}