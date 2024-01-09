import http from 'utils/request';
import {
  CustomerParams,
  CheckMerchantExistParams,
  CreateCustomerPayload,
  BiChecking,
  ReviewCustomer,
  Customer,
} from 'models/kur/Customer';
import { ListResponse, Response } from 'models/fetch';
import { CustomerDetailType } from 'models/finance/customer';

export const getAllCustomers = (params: CustomerParams) =>
  new Promise<ListResponse<Customer>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/user`, {
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

export const uploadImage = ({
  file,
  type,
}: {
  file: File;
  type: 'ktp' | 'npwp' | 'kk' | 'sku';
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('document_type', type);
      const respon = await http.post(`kur/user/document/upload`, fd);
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

export const createCustomer = (payload: CreateCustomerPayload) =>
  new Promise<CreateCustomerPayload>(async (resolve, reject) => {
    try {
      const respon = await http.post(`kur/user`, payload);
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

export const bulkBiChecking = (payload: BiChecking[]) =>
  new Promise<BiChecking[]>(async (resolve, reject) => {
    try {
      const respon = await http.put(
        `financing/user/batch-bi-checking`,
        payload,
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

export const updateCustomer = (payload: CreateCustomerPayload) =>
  new Promise<CreateCustomerPayload>(async (resolve, reject) => {
    try {
      const respon = await http.put(`kur/user/${payload.idCustomer}`, payload);
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

export const updateStatusCustomer = (payload: ReviewCustomer) =>
  new Promise<ReviewCustomer>(async (resolve, reject) => {
    try {
      const formData = new FormData();
      const userData = {
        komite_notes: payload.komite_notes,
        new_status: payload.new_status,
      };
      await formData.append('user_data', JSON.stringify(userData));
      const respon = await http.put(`financing/user/${payload.id}`, formData);
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

export const getCustomersDetails = (id: number | string) =>
  new Promise<Response<CustomerDetailType>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`financing/user/${id}`);
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

export const checkMerchantExist = (params: CheckMerchantExistParams) =>
  new Promise<Response<boolean>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`kur/user/check-merchant-id`, { params });
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
