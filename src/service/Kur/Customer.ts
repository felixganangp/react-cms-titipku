import http from 'utils/request';
import { Customer, CustomerParams } from 'models/Customer';

export const getAllCustomers = (params: CustomerParams) =>
  new Promise<CustomerParams>(async (resolve, reject) => {
    try {
      const respon = await http.get(`kur/user`, {
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
