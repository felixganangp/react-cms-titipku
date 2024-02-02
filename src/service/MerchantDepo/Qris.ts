import http from 'utils/request';
import { ListParams, ListResponse, Response } from 'models/fetch';
import { QrisForm, QrisList, QrisParams } from 'models/MerchantDepo/Qris';

export const getAllQris = (params?: QrisParams) =>
  new Promise<ListResponse<QrisList>>(async (resolve, reject) => {
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
      const respon = await http.get(`merchant-depo/qris${costumeParams}`, {
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

export const postQris = (data?: QrisForm) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
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

export const updateQris = ({
  id,
  data,
}: {
  id?: string | number;
  data?: QrisForm;
}) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const respon = await http.put(`merchant-depo/qris/${id}`, data);
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

export const deleteQris = (data?: { ids: (number | string)[] }) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const respon = await http.delete(`merchant-depo/qris`, { data });
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
