import http from 'utils/request';
import { ProductParams, CreateProduct, IsActiveType } from 'models/b2b/Product';

export const fetchProduct = (params: ProductParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get('/inventory/b2b/product', { params });
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const createProduct = (data: CreateProduct) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post('/inventory/b2b/product', data);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updateProduct = (id: number, data: CreateProduct) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.put(`/inventory/b2b/product/${id}`, data);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const deleteProduct = (body: {
  is_exist: boolean;
  ids: (string | number)[];
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.put(
        `/inventory/b2b/product/batch-is-exist`,
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

export const changeStatusProduct = (body: {
  is_active: boolean;
  ids: (string | number)[] | number[];
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.put(
        `/inventory/b2b/product/batch-is-active`,
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

export const stockOpnameProduct = (payload: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.put(`/inventory/b2b/product/batch-stock`, {
        body: payload,
      });
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const batchUndoChangeStatus = async (body: IsActiveType[]) => {
  const callBatchChangeStatus = [];
  for (let i = 0; i < body.length; i += 1) {
    callBatchChangeStatus.push(
      http.put(`/inventory/b2b/product/batch-is-active`, body[i]),
    );
  }

  const result = await Promise.allSettled(callBatchChangeStatus);
  const response = (
    result.find((res) => res.status === 'fulfilled') as
      | PromiseFulfilledResult<string>
      | undefined
  )?.value;

  if (!response) {
    const error = (
      result.find((res) => res.status === 'rejected') as
        | PromiseRejectedResult
        | undefined
    )?.reason;
    return error;
  }
};
