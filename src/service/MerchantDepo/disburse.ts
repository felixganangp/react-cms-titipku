/* eslint-disable no-lonely-if */
/* eslint-disable @typescript-eslint/naming-convention */
import http from 'utils/request';
import { ListResponse, Response } from 'models/fetch';
import {
  DisburseParams,
  DisburseList,
  DisburseDetails,
  MerchantParams,
} from 'models/merchantDepo/disburse';
import { MerchantList } from 'models/merchantDepo/Merchant';

export const getAllDisburse = (params?: DisburseParams) =>
  new Promise<ListResponse<DisburseList>>(async (resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // @ts-ingnore
    const paramsRest = { ...params };
    let costumeParams = '?';
    if (typeof paramsRest.status === 'object') {
      paramsRest.status.forEach((val, index) => {
        costumeParams += `status=${val}${
          index === (paramsRest?.status?.length || 0) - 1 ? '' : '&'
        }`;
      });
      delete paramsRest.status;
    }
    if (costumeParams.length <= 1) costumeParams = '';

    try {
      const respon = await http.get(`merchant-depo/disburse${costumeParams}`, {
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

export const detailsDisburse = (id?: number | string) =>
  new Promise<Response<DisburseDetails>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`merchant-depo/disburse/${id}`);
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

export const updateStatusDisburse = (data?: any) =>
  new Promise<ListResponse<DisburseList>>(async (resolve, reject) => {
    try {
      const respon = await http.put(`merchant-depo/disburse`, data);
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

export const postDisburse = (data?: any) =>
  new Promise<ListResponse<DisburseList>>(async (resolve, reject) => {
    try {
      const respon = await http.post(`merchant-depo/disburse`, data);
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

export const getDisburseStatus = () =>
  new Promise<ListResponse<{ id: number; description: string }>>(
    async (resolve, reject) => {
      try {
        const respon = await http.get(`merchant-depo/disburse/status`, {});
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

export const updateDisburse = ({ data, id }: any) =>
  new Promise<ListResponse<DisburseList>>(async (resolve, reject) => {
    try {
      const respon = await http.put(`merchant-depo/disburse/${id}`, data);
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

export const getMerchantDepoList = (params?: MerchantParams) =>
  new Promise<ListResponse<MerchantList>>(async (resolve, reject) => {
    const paramsRest = { ...params };
    let costumeParams = '?';
    if (paramsRest.jelajah_id) {
      paramsRest.jelajah_id.forEach((val, index) => {
        costumeParams += `jelajah_id=${val}${
          index === (paramsRest?.jelajah_id?.length || 0) - 1 ? '&' : '&'
        }`;
      });
      delete paramsRest.jelajah_id;
    }
    if (paramsRest.depo_type_id) {
      paramsRest.depo_type_id.forEach((val, index) => {
        costumeParams += `depo_type_id=${val}${
          index === (paramsRest?.depo_type_id?.length || 0) - 1 ? '' : '&'
        }`;
      });
      delete paramsRest.depo_type_id;
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
