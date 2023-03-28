import http from 'utils/request';
import { CreateProduct } from 'models/b2b/ProductParent';
import { ListParams } from 'models/fetch';

export const uploadImage = (data: { image: string | Blob }) =>
  new Promise(async (resolve, reject) => {
    try {
      const fd = new FormData();
      fd.append('image', data.image);
      const response = await http.post(
        '/inventory/b2b/product/parent/upload',
        fd,
      );
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const fetchProduct = (params: ListParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get('/inventory/b2b/product/parent', {
        params,
      });
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
      const response = await http.post('/inventory/b2b/product/parent', data);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const IsExistName = (params: {
  name: string;
  exclude_id?: number | string;
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get(
        '/inventory/b2b/product/parent/check-name',
        {
          params,
        },
      );
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
