import http from 'utils/request';
import { ListParams, ListResponse } from 'models/fetch';

export const fetchCustomer = (params?: ListParams) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const response = await http.get('/serpong-fresh/customer', {
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

export const fetchArea = (params?: ListParams) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const response = await http.get('/serpong-fresh/area', {
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
export const fetchCustomerType = (params?: ListParams) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const response = await http.get('/serpong-fresh/customer-type', {
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

export const deleteCustomer = (id: number) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.delete(`/serpong-fresh/customer/${id}`);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const createCustomer = (data: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(`/serpong-fresh/customer`, data);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updateCustomer = ({
  id,
  data,
}: {
  id: number | string;
  data: any;
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.put(`/serpong-fresh/customer/${id}`, data);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
