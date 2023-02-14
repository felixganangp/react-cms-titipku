import http from 'utils/request';
import { PaymentKURParams } from 'models/kur/Invoice';

export const getAllInvoiceKur = (params: PaymentKURParams) =>
  new Promise<PaymentKURParams>(async (resolve, reject) => {
    try {
      const respon = await http.get(`kur/invoice`, {
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

export const getAllInvoiceKurDetail = (id: number | string) =>
  new Promise<PaymentKURParams>(async (resolve, reject) => {
    try {
      const respon = await http.get(`kur/invoice/${id}`);
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

export const getAllStatusInvoice = () =>
  new Promise<PaymentKURParams>(async (resolve, reject) => {
    try {
      const respon = await http.get(`kur/invoice/paid-status`);
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

export const getAllConditionInvoice = () =>
  new Promise<PaymentKURParams>(async (resolve, reject) => {
    try {
      const respon = await http.get(`kur/invoice/condition`);
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
