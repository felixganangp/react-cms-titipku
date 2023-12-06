import http from 'utils/request';
import { ListResponse, Response } from 'models/fetch';
import { SettlementParams } from 'models/finance/payment';

export const getSettlementeAll = (params?: SettlementParams) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/payment/settlement`, {
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
