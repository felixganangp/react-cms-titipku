import http from 'utils/request';
import { ListParams } from 'models/fetch';

export const fetchCategory = (params: ListParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get('/inventory/b2b/category', {
        params,
      });
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
