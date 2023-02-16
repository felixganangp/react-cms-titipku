import http from 'utils/request';
import { CreatePayment, PaymentKURParams } from 'models/kur/Payment';
import { ListParams } from 'models/fetch';

export const getAllPaymentKUR = (params: PaymentKURParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get('/kur/payment?', { params });
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const getAllArea = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get(`/kur/area`, { params });
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const getPaymentDetails = (id: number | string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get(`/kur/payment/${id}`);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const getCustomerBalance = (id: number | string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get(`/kur/user/${id}/balance`);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const getDetailsTable = (id: number | string, params: ListParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get(`/kur/request/${id}/detail`, { params });
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const getCreditBalanceById = (id: number | string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get(`/kur/user/${id}/balance`);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const approvePayment = (id: number | string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(`/kur/payment/${id}/approve`, {
        remarks: '',
      });
      if (response) resolve(response);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.reponse.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const rejectPayment = (body: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const { id, remarks } = body;
      const response = await http.post(`/kur/payment/${id}/reject`, {
        remarks,
      });
      if (response) resolve(response);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const createPayment = (body: CreatePayment) =>
  new Promise(async (resolve, reject) => {
    try {
      const fd = new FormData();
      fd.append('data', JSON.stringify(body.body.data));
      fd.append('file', body.body.file);
      const response = await http.post(`/kur/payment`, fd);
      if (response) resolve(response);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const fetchBankAccount = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get(`/kur/config/bank-account`);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
