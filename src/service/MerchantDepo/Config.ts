import http from 'utils/request';
import { ListParams, ListResponse, Response } from 'models/fetch';
import { ConfigType } from 'models/merchantDepo/Config';

export const getAllAreaMerchantDepo = (params?: ListParams) =>
  new Promise<ListResponse<ConfigType>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`merchant-depo/area`, {
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

export const getAllTypeMerchantDepo = (params?: { area_id?: number }) =>
  new Promise<ListResponse<{ id: number; description: string }>>(
    async (resolve, reject) => {
      try {
        const respon = await http.get(`merchant-depo/merchant-depo/types`, {
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
    },
  );

export const getAllFilterMerchantDepo = (params?: ListParams) =>
  new Promise<ListResponse<{ id: number; merchant_name: string }>>(
    async (resolve, reject) => {
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
    },
  );

export const getAllFilterMerchant = (params?: ListParams) =>
  new Promise<ListResponse<{ id: number; merchant_name: string }>>(
    async (resolve, reject) => {
      try {
        const respon = await http.get(`merchant-depo/merchant/filter`, {
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
    },
  );
