import http from 'utils/request';
import { MerchantParams } from 'models/Merchant';

export const getAllMerchants = (params: MerchantParams) =>
  new Promise<MerchantParams>(async (resolve, reject) => {
    try {
      const respon = await http.get(`kur/merchant`, {
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
