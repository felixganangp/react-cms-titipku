import http from 'utils/request';
import { CreateSupplier } from 'models/b2b/Supplier';

export const fetchSupplier = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.get(`/inventory/b2b/supplier`, {
        params,
      });
      if (respon.data) {
        resolve(respon.data);
      }
    } catch (err: any) {
      const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const createSupplier = (body: CreateSupplier) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(`/inventory/b2b/supplier`, body);
      if (response.data) {
        resolve(response.data);
      }
    } catch (err: any) {
      const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const updateSupplier = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { name, phone_number, address, id } = params;
      const body = {
        name,
        phone_number,
        address,
      };
      const response = await http.put(`/inventory/b2b/supplier/${id}`, body);

      if (response.data) {
        resolve(response.data);
      }
    } catch (err: any) {
      const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });

export const deleteSupplier = (body: { ids: (string | number)[] }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(
        `/inventory/b2b/supplier/batch-delete`,
        body,
      );
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
