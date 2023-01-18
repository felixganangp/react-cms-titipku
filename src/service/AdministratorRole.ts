import http from 'utils/request';

export const fetchAdministratorRole  = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.post(`/administrator/role?account_type=cms`, {
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


export const createAdministratorRole  = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.post(`/administrator`, {
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


export const fetchAdministratorControl = () =>
  new Promise(async (resolve, reject) => {
    try {
        const respon = await http.get(`/administrator/control?account_type=cms`);
        if (respon.data) resolve(respon.data);
    } catch (err: any) {
        const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
        reject(message);
    }
});