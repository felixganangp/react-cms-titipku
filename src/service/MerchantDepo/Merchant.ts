import http from 'utils/request';
import { ListResponse, Response } from 'models/fetch';
import { MerchantList, MerchantParams } from 'models/MerchantDepo/Merchant';

export const getMerchantDepoList = (params?: MerchantParams) =>
  new Promise<ListResponse<MerchantList>>(async (resolve, reject) => {
    const paramsRest = { ...params };
    let costumeParams = '?';
    if (paramsRest.jelajah_id) {
      paramsRest.jelajah_id.forEach((val, index) => {
        costumeParams += `jelajah_id=${val}${
          index === (paramsRest?.jelajah_id?.length || 0) - 1 ? '' : '&'
        }`;
      });
      delete paramsRest.jelajah_id;
    }
    try {
      const respon = await http.get(
        `merchant-depo/merchant-depo${costumeParams}`,
        {
          params: paramsRest,
        },
      );
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

export const getMerchantList = (params?: MerchantParams) =>
  new Promise<ListResponse<MerchantList>>(async (resolve, reject) => {
    const paramsRest = { ...params };
    let costumeParams = '?';
    if (paramsRest.jelajah_id) {
      paramsRest.jelajah_id.forEach((val, index) => {
        costumeParams += `jelajah_id=${val}${
          index === (paramsRest?.jelajah_id?.length || 0) - 1 ? '' : '&'
        }`;
      });
      delete paramsRest.jelajah_id;
    }
    try {
      const respon = await http.get(`merchant-depo/merchant${costumeParams}`, {
        params: paramsRest,
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

export const postMerchant = (data?: any) =>
  new Promise<ListResponse<MerchantList>>(async (resolve, reject) => {
    try {
      const respon = await http.post(`merchant-depo/merchant-depo`, data);
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

export const updateMerchant = (data?: any) =>
  new Promise<ListResponse<MerchantList>>(async (resolve, reject) => {
    try {
      const respon = await http.put(`merchant-depo/merchant-depo`, data);
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

export const deleteMerchant = (data?: { ids: (number | string)[] }) =>
  new Promise<ListResponse<MerchantList>>(async (resolve, reject) => {
    try {
      const respon = await http.delete(`merchant-depo/merchant-depo`, { data });
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
