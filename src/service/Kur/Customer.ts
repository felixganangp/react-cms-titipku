import http from 'utils/request';
import {
  CustomerParams,
  CheckMerchantExistParams,
  CreateCustomerPayload,
  BiChecking,
  ReviewCustomer,
  VerifyCustomer,
  Customer,
} from 'models/kur/Customer';
import { ListResponse, Response } from 'models/fetch';
import { CustomerDetailType } from 'models/finance/customer';

export const getAllCustomers = (params: CustomerParams) =>
  new Promise<ListResponse<Customer>>(async (resolve, reject) => {
    try {
      let objString = '';
      const object = {};

      if ((params.area_id?.length || 0) > 0) {
        // @ts-ignore
        params.area_id.forEach((area) => {
          console.log('area', area);
          if (objString[0] === '?') {
            objString += `&area_id=${area}`;
          } else {
            objString += `?area_id=${area}`;
          }
        });
      }

      // @ts-ignore
      if ((params.category_jelajah_id?.length || 0) > 0) {
        // @ts-ignore
        params.category_jelajah_id.forEach((category) => {
          if (objString[0] === '?') {
            objString += `&category_jelajah_id=${category}`;
          } else {
            objString += `?category_jelajah_id=${category}`;
          }
        });
      }

      // @ts-ignore
      if ((params.batch_id?.length || 0) > 0) {
        // @ts-ignore
        params.batch_id.forEach((batch) => {
          if (objString[0] === '?') {
            objString += `&batch_id=${batch}`;
          } else {
            objString += `?batch_id=${batch}`;
          }
        });
      }

      if (Object.keys(params).length > 0) {
        Object.keys(params)
          .filter(
            (val) =>
              ![
                'area_id',
                'category_jelajah_id',
                'batch_id',
                'advance',
              ].includes(val),
          )
          .forEach((key) => {
            // @ts-ignore
            if (params[key]) {
              // @ts-ignore
              object[key] = params[key];
            }
          });
      }

      // console.log('object1', params);
      // console.log('object2', objString);
      // console.log('object3', object);
      // const respon = await http.get(`financing/user`, {
      //   params,
      // });
      const respon = await http.get(`financing/user${objString}`, {
        params: object,
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
      const userData = Object.fromEntries(
        Object.entries(payload).filter(
          ([key, value]) => value !== null && key !== 'id',
        ),
      );
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

export const verifyCustomer = (payload: VerifyCustomer) =>
  new Promise<VerifyCustomer>(async (resolve, reject) => {
    try {
      const formData = new FormData();
      const userData = {
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

export const getDownloadPdfUser = (id: string) =>
  new Promise<Response<boolean>>(async (resolve, reject) => {
    try {
      const respon = await http.get(`/financing/user/${id}/generate-pdf`);
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
