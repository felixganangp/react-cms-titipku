import http from 'utils/request';
import { ListResponse, Response } from 'models/fetch';
import { MerchantParams } from 'models/Merchant';

export const getMerchantDepoList = (params?: MerchantParams) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`merchant-depo/merchant-depo`, { params });
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
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`merchant-depo/merchant`, { params });
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
