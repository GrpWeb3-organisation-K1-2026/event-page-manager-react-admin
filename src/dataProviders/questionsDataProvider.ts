import type { DataProvider } from "react-admin";
import { createBaseDataProvider } from "./baseDataProvider";

const base = createBaseDataProvider("questions");

export const questionsDataProvider: DataProvider = {
  ...base,

  create: () => Promise.reject(new Error("Questions cannot be created from the admin.")),
  update: () => Promise.reject(new Error("Questions cannot be edited from the admin.")),
};