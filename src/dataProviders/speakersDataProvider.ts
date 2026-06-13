import type { DataProvider } from "react-admin";
import { createBaseDataProvider } from "./baseDataProvider";
import { httpClient } from "./httpClient";

const base = createBaseDataProvider("speakers");

export const speakersDataProvider: DataProvider = {
  ...base,

  create: async (_resource, params) => {
    const payload = {
      ...params.data,
      links: params.data.links ?? {},
    };
    const { data } = await httpClient.post("/speakers", payload);
    return { data };
  },

  update: async (_resource, params) => {
    const payload = {
      ...params.data,
      links: params.data.links ?? {},
    };
    const { data } = await httpClient.put(
      `/speakers/${params.id}`,
      payload
    );
    return { data };
  },
};