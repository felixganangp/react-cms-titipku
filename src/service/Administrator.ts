import http from 'utils/request';

export const getAllAdministrator = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.get(`administrator/role?account_type=cms`, {
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
