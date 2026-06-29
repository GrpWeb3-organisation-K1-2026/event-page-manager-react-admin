import type { DataProvider } from "react-admin";
import { createBaseDataProvider } from "./baseDataProvider";
import { httpClient, buildListQuery, parseTotalCount } from "./httpClient";

const base = createBaseDataProvider("events");

export const eventsDataProvider: DataProvider = {
  ...base,

  getList: async (_resource, params) => {
    const query = buildListQuery(params.pagination, params.sort, params.filter);
    const { data: body, headers } = await httpClient.get("/events", {
      params: query,
    });
    const list = Array.isArray(body) ? body : (body.data ?? body);
    return { data: list, total: parseTotalCount(headers) };
  },
};