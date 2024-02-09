import http from 'utils/request';
import { ListParams, ListResponse, Response } from 'models/fetch';
import {
  MerchantDetails,
  MerchantList,
  MerchantParams,
  TransactionMerchantDepoList,
} from 'models/merchantDepo/Merchant';

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
    if (costumeParams.length <= 1) costumeParams = '';
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
  new Promise<
    ListResponse<{
      area_name: string;
      id: number;
      join_date: number;
      last_month_gmv: number;
      last_month_total_trx: number;
      merchant_name: string;
    }>
  >(async (resolve, reject) => {
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
    if (costumeParams.length <= 1) costumeParams = '';
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

export const detailsMerchant = (id?: number | string) =>
  new Promise<Response<MerchantDetails>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`merchant-depo/merchant-depo/${id}`);
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

export const getMerchantFilterList = (params?: MerchantParams) =>
  new Promise<ListResponse<MerchantList>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`merchant-depo/merchant-depo/filter`, {
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

export const updateMerchant = ({ data, id }: any) =>
  new Promise<ListResponse<MerchantList>>(async (resolve, reject) => {
    try {
      const respon = await http.put(`merchant-depo/merchant-depo/${id}`, data);
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

export const getMerchantDepoLimitHistoryList = (
  id?: string,
  params?: ListParams,
) =>
  new Promise<ListResponse<MerchantList>>(async (resolve, reject) => {
    try {
      const respon = await http.get(
        `merchant-depo/merchant-depo/limit-history/${id}`,
        {
          params,
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

export const getAllTransactionMerchantDepo = (
  id?: string,
  params?: ListParams,
) =>
  new Promise<ListResponse<TransactionMerchantDepoList>>(
    async (resolve, reject) => {
      try {
        const respon = await http.get(
          `merchant-depo/merchant-depo/${id}/transaction-history`,
          {
            params,
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
    },
  );
