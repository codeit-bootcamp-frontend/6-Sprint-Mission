import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type QueryOptions<TRes = unknown, TQueryKey = string> = Omit<
  UseQueryOptions<TRes, AxiosError, TRes, TQueryKey[]>,
  "queryKey" | "queryFn" | "refetchInterval" | "initialData"
>;
