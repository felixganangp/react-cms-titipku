import http from 'utils/request';
import { ListParams, ListResponse } from 'models/fetch';

export const fetchDriver = (params: ListParams) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const response = await http.get('/serpong-fresh/driver', {
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

export const deleteDriver = (id: number) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.delete(`/serpong-fresh/driver/${id}`);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const createDriver = (data: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(`/serpong-fresh/driver`, data);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updateDriver = ({
  id,
  data,
}: {
  id: number | string;
  data: any;
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.put(`/serpong-fresh/driver/${id}`, data);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
