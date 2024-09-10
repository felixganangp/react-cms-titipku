import http from 'utils/request';
import { ListResponse, Response } from 'models/fetch';
import { PaymentParams, SettlementParams } from 'models/finance/payment';

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

export const getPaymentAll = (params?: PaymentParams) =>
  new Promise<ListResponse<any>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/payment`, {
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

export const createPayment = (data: FormData) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.post(`financing/payment`, data);
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

export const getPaymentSimulation = (params: {
  amount: number;
  user_id: number | string;
  payment_date: number;
  invoice_type_id: number;
}) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/payment/payment-simulation`, {
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

export const getpaymentDetails = (id?: string | number) =>
  new Promise<Response<any>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/payment/${id}`);
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

export const deletePayment = (id: string) =>
  new Promise<Response<any>>(async (resolve, reject) => {
    try {
      const respon = await http.delete(`financing/payment/${id}`);
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
