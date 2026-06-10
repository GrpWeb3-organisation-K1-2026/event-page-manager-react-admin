import type { DataProvider } from "react-admin";
import { createBaseDataProvider } from "./baseDataprovider";
import { httpClient, buildListQuery, parseTotalCount } from "./httpClient";

const base = createBaseDataProvider("events");

export const eventsDataProvider: DataProvider = {
  ...base,

  getList: async (_resource, params) => {
    const query = {
      ...buildListQuery(params.pagination, params.sort, params.filter),
      _embed: "sessions",
    };
    const { data, headers } = await httpClient.get("/events", {
      params: query,
    });
    return { data, total: parseTotalCount(headers) };
  },
};