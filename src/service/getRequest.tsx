import toast from "react-hot-toast";
import { API } from "./getEnv";


export const getRequest = async (
  url: string,
  token?: string | null,
  params?: Record<string, string>,
) => {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  query;
  const res = await fetch(`${API}${url}`, {
    // @ts-ignore 
    next: { revalidate: 60 },
    headers: {
  ...(token && { Authorization: `Bearer ${token}` }),
}})

  const data = await res.json();
  return data;
};

export const loginRequest = async (
  url: string,
  params?: Record<string, string>
) => {
  const res = await fetch(`${API}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  return data;
};

export const postRequest = async (
  url: string,
  params?: Record<string, string>,
  token?: string | null
) => {
  const res = await fetch(`${API}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  return data;
};

export const patchRequest = async (
  url: string,
  params?: Record<string, any>,
  token?: string | null
) => {
  const res = await fetch(`${API}${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Ошибка при обновлении");
  }

  return await res.json();
};
export const deleteRequest = async (
  url: string,
  token?: string | null
) => (
  await fetch(`${API}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  })
)