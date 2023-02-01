import http from 'utils/request';
import { RequestKURParams } from 'models/kur/Request';

export const getAllRequestKUR = (params: RequestKURParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.get('/kur/request', { params });
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
