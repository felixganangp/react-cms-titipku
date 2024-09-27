import http from 'utils/request';
import { InvoiceListType, InvoiceParams } from 'models/finance/invoice';
import { ListParams, ListResponse } from 'models/fetch';
import { AreaType, CategoryType } from 'models/finance/config';

export const getAllAreaFinancing = (params?: ListParams) =>
  new Promise<ListResponse<AreaType>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/area`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const getAllCategoryFinancing = (params?: InvoiceParams) =>
  new Promise<ListResponse<CategoryType>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/jelajah-category`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const getPaymentMethod = (params?: ListParams) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/payment/payment-method`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const getAllBatch = (params?: ListParams) =>
  new Promise<ListResponse<AreaType>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/user/batch`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const getAllOfficer = (params?: ListParams) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/user/officer`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const getAllUserTyoeFinancing = (params?: ListParams) =>
  new Promise<ListResponse<AreaType>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/user-type`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
