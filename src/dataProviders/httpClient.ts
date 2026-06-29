import axios, { type AxiosResponseHeaders, type RawAxiosResponseHeaders } from "axios";
import type { PaginationPayload, SortPayload } from "react-admin";

export const API_URL = "http://localhost:3000/api";

export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem("auth");
  if (raw) {
    try {
      const { token } = JSON.parse(raw);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
  }
  return config;
});

export const buildListQuery = (
  pagination: PaginationPayload | undefined,
  sort: SortPayload | undefined,
  filter: Record<string, unknown> = {}
) => {
  const page = pagination?.page ?? 1;
  const perPage = pagination?.perPage ?? 25;

  return {
    page,
    limit: perPage,
    ...filter,
  };
};

export const parseTotalCount = (
  headers: AxiosResponseHeaders | RawAxiosResponseHeaders
): number => {
  const value = headers["x-total-count"];
  return parseInt(typeof value === "string" ? value : "0", 10);
};

export const buildIdsQuery = (ids: (string | number)[]): string =>
  ids.map((id) => `id=${id}`).join("&");