import http from 'utils/request';
import { Type } from 'models/kur/Type';

export const getAllTypes = () =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.get(`kur/user/type`);
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
