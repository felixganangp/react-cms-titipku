import http from 'utils/request';

export const fetchInbound = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.get(`/inventory/b2b/purchase`, {
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

export const fetchInboundDetails = (id: number | string) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.get(`/inventory/b2b/purchase/${id}`);
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
export const createInbound = (data: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post('/inventory/b2b/purchase', data);
      if (response.data) resolve(response.data);
    } catch (err: any) {
      const message: string = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });
