import http from 'utils/request';

export const getAllAdministratorRole = (params: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const respon = await http.get(`administrator/role`, {
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
