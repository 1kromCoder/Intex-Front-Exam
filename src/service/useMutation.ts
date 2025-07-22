// hooks/useMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../service/getEnv";
import axios from "axios";

export const usePostData = (url: string, token?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: Record<string, any>) =>
      axios.post(`${API}${url}`, params, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(); // or pass specific keys
    },
  });
};
export const usePatchData = (url: string, token?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: Record<string, any>) =>
      axios.patch(`${API}${url}`, params, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      console.error("Ошибка при обновлении:", error?.response?.data?.message);
    },
  });
};

export const useDeleteData = (url: string, token?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) =>
      axios.delete(`${API}${url}/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
