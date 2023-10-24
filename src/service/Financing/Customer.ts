import http from 'utils/request';
import { CustomerParams } from 'models/kur/Customer';
import { Customer } from 'models/financing/Customer';
import { Response } from 'models/fetch';

export const getAllCustomers = (params: CustomerParams) =>
  new Promise<CustomerParams>(async (resolve, reject) => {
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
