import type { DataProvider } from "react-admin";
import { createBaseDataProvider } from "./baseDataProvider";
import { httpClient } from "./httpClient";

const base = createBaseDataProvider("sessions");

export const sessionsDataProvider: DataProvider = {
  ...base,

  create: async (_resource, params) => {
    const { speakerIds, speakers, ...rest } = params.data;

    const payload = {
      ...rest,
      speakerIds: speakerIds ?? [],
    };

    const { data } = await httpClient.post("/sessions", payload);
    return { data };
  },

  update: async (_resource, params) => {
    const { speakerIds, speakers, ...rest } = params.data;

    const payload = {
      ...rest,
      speakerIds: speakerIds ?? [],
    };

    const { data } = await httpClient.put(
      `/sessions/${params.id}`,
      payload
    );
    return { data };
  },
};