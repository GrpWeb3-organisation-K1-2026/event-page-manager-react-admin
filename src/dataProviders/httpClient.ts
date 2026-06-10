import axios, { type AxiosResponseHeaders, type RawAxiosResponseHeaders } from "axios";
import type { PaginationPayload, SortPayload } from "react-admin";

export const API_URL = "http://localhost:3002";

export const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const buildListQuery = (
  pagination: PaginationPayload | undefined,
  sort: SortPayload | undefined,
  filter: Record<string, unknown> = {}
) => {
  const page = pagination?.page ?? 1;
  const perPage = pagination?.perPage ?? 25;
  const field = sort?.field ?? "id";
  const order = sort?.order ?? "ASC";

  return {
    _sort: field,
    _order: order,
    _start: (page - 1) * perPage,
    _end: page * perPage,
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