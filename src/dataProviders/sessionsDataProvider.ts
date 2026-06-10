import type { DataProvider } from "react-admin";
import { createBaseDataProvider } from "./baseDataprovider";
import { httpClient } from "./httpClient";

const base = createBaseDataProvider("sessions");

export const sessionsDataProvider: DataProvider = {
  ...base,

  /**
   * Override create to handle the speakerIds array coming from
   * SpeakersSelectInput (custom field that stores `speakerIds`).
   */
  create: async (_resource, params) => {
    const { speakerIds, speakers, ...rest } = params.data;

    const payload = {
      ...rest,
      speakerIds: speakerIds ?? [],
    };

    const { data } = await httpClient.post("/sessions", payload);
    return { data };
  },

  /**
   * Override update for the same reason — keep speakerIds in sync.
   */
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