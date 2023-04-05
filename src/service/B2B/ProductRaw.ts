import { CreateRawService, RawParams } from 'models/b2b/ProductRaw';
import http from 'utils/request';

export const fetchData = (params: RawParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get('/inventory/b2b/product/raw', { params });
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const create = (body: CreateRawService) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post('/inventory/b2b/product/raw', body);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const update = (data: { id: string | number; body: CreateRawService }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.put(
        `/inventory/b2b/product/raw/${data.id}`,
        data.body,
      );
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const deleteRaw = (body: {
  is_exist: boolean;
  ids: (string | number)[];
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.put(
        `/inventory/b2b/product/raw/batch-is-exist`,
        body,
      );
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
