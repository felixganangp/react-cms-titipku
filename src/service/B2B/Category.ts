import http from 'utils/request';
import { ListParams } from 'models/fetch';
import { UomTypes, CreateUomTypes } from 'models/b2b/Uom';

export const fetchCategory = (params: ListParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get('/inventory/b2b/category', {
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

export const create = (value: CreateUomTypes) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post('/inventory/b2b/category', value);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const update = (id: number, value: CreateUomTypes) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.put(`/inventory/b2b/category/${id}`, value);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const deleteCategory = (id: number) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.delete(`/inventory/b2b/category/${id}`);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
