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
    const { data: body } = await httpClient.post("/speakers", payload);
    return { data: body?.data ?? body };
  },

  update: async (_resource, params) => {
    const payload = {
      ...params.data,
      links: params.data.links ?? {},
    };
    const { data: body } = await httpClient.patch(
      `/speakers/${params.id}`,
      payload
    );
    return { data: body?.data ?? body };
  },
};