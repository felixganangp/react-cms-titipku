import http from 'utils/request';
import { InvoiceListType, InvoiceParams } from 'models/finance/invoice';
import { ListResponse } from 'models/fetch';

export const getInvoiceAll = (params?: InvoiceParams) =>
  new Promise<ListResponse<InvoiceListType>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/invoice`, {
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

export const createInvoice = (data: FormData) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`financing/invoice`, data);
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

export const setManualSettled = ({ id, data }: { id: string; data: any }) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(
        `financing/invoice/${id}/manual-settled`,
        data,
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
