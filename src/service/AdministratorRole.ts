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


export const createAdministratorRole  = (body: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await http.post(`/administrator/role`, body);
      console.log('response', response);
      if (response) {
        resolve(response);
      }
    } catch (err: any) {
      const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
      reject(message);
    }
  });


export const fetchAdministratorControl = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
        const respon = await http.get(`/administrator/control`, {
          params,
        });
        if (respon.data) resolve(respon.data);
    } catch (err: any) {
        const message = err.response
        ? `${err.response.data.message}`
        : 'Oops, something wrong with our server, please try again later.';
        reject(message);
    }
});