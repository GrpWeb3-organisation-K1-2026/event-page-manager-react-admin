import type { DataProvider } from "react-admin";
import { eventsDataProvider } from "./eventsDataProvider";   
import { sessionsDataProvider } from "./sessionsDataProvider";
import { speakersDataProvider } from "./speakersDataProvider";
import { roomsDataProvider } from "./roomsDataProvider";
import { questionsDataProvider } from "./questionsDataProvider";

const providers: Record<string, DataProvider> = {
  events: eventsDataProvider,
  sessions: sessionsDataProvider,
  speakers: speakersDataProvider,
  rooms: roomsDataProvider,
  questions: questionsDataProvider,
};

type DataProviderMethod = keyof DataProvider;

export const dataProvider = new Proxy({} as DataProvider, {
  get(_, method: string) {
    return (resource: string, params: unknown) => {
      const provider = providers[resource];

      if (!provider) {
        throw new Error(
          `[dataProvider] No provider registered for resource "${resource}"`
        );
      }

      const fn = provider[method as DataProviderMethod];

      if (typeof fn !== "function") {
        throw new Error(
          `[dataProvider] Method "${method}" not found on provider for "${resource}"`
        );
      }

      return fn(resource, params);
    };
  },
});