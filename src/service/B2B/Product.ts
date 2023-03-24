import http from 'utils/request';
import { ProductParams } from 'models/b2b/Product';

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

export const deleteProduct = (ids: number[]) =>
  new Promise(async (resolve, reject) => {
    try {
      //   const response = await http.delete(`/b2b/inventory/${id}`);
      //   if (response.data) resolve(response.data);
      console.log('delete product');
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
