/* eslint-disable @typescript-eslint/naming-convention */
import http from 'utils/request';
import { ListResponse, Response } from 'models/fetch';
import { DisburseParams, DisburseList } from 'models/merchantDepo/disburse';

export const getAllDisburse = (params?: DisburseParams) =>
  new Promise<ListResponse<DisburseList>>(async (resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // @ts-ingnore
    const paramsRest = { ...params };
    try {
      const respon = await http.get(`merchant-depo/disburse?`, {
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

export const deleteDisburse = (data?: { ids: (number | string)[] }) =>
  new Promise<ListResponse<DisburseList>>(async (resolve, reject) => {
    try {
      const respon = await http.delete(`merchant-depo/disburse`, { data });
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
