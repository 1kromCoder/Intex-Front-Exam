import { useQuery } from "@tanstack/react-query";
import { API } from "./getEnv";
import axios from "axios";

export const useGetData = (url: string, token?: string | null, params?: Record<string, string>) => {
  return useQuery({
    queryKey: [url, params],
    queryFn: () =>
      axios.get(`${API}${url}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        params,
      }).then((res:any) => res.data),
  });
};
