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
    const { data: body, headers } = await httpClient.get(`/${resource}`, {
      params: query,
    });
    const list = Array.isArray(body) ? body : (body.data ?? body);
    return { data: list, total: parseTotalCount(headers) };
  },

  getOne: async (_resource, params) => {
    const { data: body } = await httpClient.get(`/${resource}/${params.id}`);
    const record = body?.data ?? body;
    return { data: record };
  },

  getMany: async (_resource, params) => {
    const { data: body } = await httpClient.get(
      `/${resource}?${buildIdsQuery(params.ids)}`
    );
    const list = Array.isArray(body) ? body : (body.data ?? body);
    return { data: list };
  },

  getManyReference: async (_resource, params) => {
    const query = {
      ...buildListQuery(params.pagination, params.sort, params.filter),
      [params.target]: params.id,
    };
    const { data: body, headers } = await httpClient.get(`/${resource}`, {
      params: query,
    });
    const list = Array.isArray(body) ? body : (body.data ?? body);
    return { data: list, total: parseTotalCount(headers) };
  },

  create: async (_resource, params) => {
    const { data: body } = await httpClient.post(`/${resource}`, params.data);
    const record = body?.data ?? body;
    return { data: record };
  },

  update: async (_resource, params) => {
    const { data: body } = await httpClient.patch(
      `/${resource}/${params.id}`,
      params.data
    );
    const record = body?.data ?? body;
    return { data: record };
  },

  updateMany: async (_resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient.patch(`/${resource}/${id}`, params.data)
      )
    );
    return { data: params.ids };
  },

  delete: async (_resource, params) => {
    const { data: body } = await httpClient.delete(`/${resource}/${params.id}`);
    const record = body?.data ?? body ?? { id: params.id };
    return { data: record };
  },

  deleteMany: async (_resource, params) => {
    await Promise.all(
      params.ids.map((id) => httpClient.delete(`/${resource}/${id}`))
    );
    return { data: params.ids };
  },
});