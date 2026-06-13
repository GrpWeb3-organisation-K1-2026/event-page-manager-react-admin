import type { DataProvider } from "react-admin";
import {
  httpClient,
  buildListQuery,
  parseTotalCount,
  buildIdsQuery,
} from "./httpClient";

export const createBaseDataProvider = (resource: string): DataProvider => ({
  getList: async (_resource, params) => {
    const query = buildListQuery(params.pagination, params.sort, params.filter);
    const { data, headers } = await httpClient.get(`/${resource}`, {
      params: query,
    });
    return { data, total: parseTotalCount(headers) };
  },

  getOne: async (_resource, params) => {
    const { data } = await httpClient.get(`/${resource}/${params.id}`);
    return { data };
  },

  getMany: async (_resource, params) => {
    const { data } = await httpClient.get(
      `/${resource}?${buildIdsQuery(params.ids)}`
    );
    return { data };
  },

  getManyReference: async (_resource, params) => {
    const query = {
      ...buildListQuery(params.pagination, params.sort, params.filter),
      [params.target]: params.id,
    };
    const { data, headers } = await httpClient.get(`/${resource}`, {
      params: query,
    });
    return { data, total: parseTotalCount(headers) };
  },

  create: async (_resource, params) => {
    const { data } = await httpClient.post(`/${resource}`, params.data);
    return { data };
  },

  update: async (_resource, params) => {
    const { data } = await httpClient.put(
      `/${resource}/${params.id}`,
      params.data
    );
    return { data };
  },

  updateMany: async (_resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient.put(`/${resource}/${id}`, params.data)
      )
    );
    return { data: params.ids };
  },

  delete: async (_resource, params) => {
    const { data } = await httpClient.delete(`/${resource}/${params.id}`);
    return { data };
  },

  deleteMany: async (_resource, params) => {
    await Promise.all(
      params.ids.map((id) => httpClient.delete(`/${resource}/${id}`))
    );
    return { data: params.ids };
  },
});